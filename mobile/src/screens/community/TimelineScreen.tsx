// mobile/src/screens/community/TimelineScreen.tsx
// Civic Timeline & "What's on your mind?" Social Feed for Sagamu Remo Kingdom

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Share,
} from 'react-native';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Colors, Spacing, Radius } from '../../theme';
import { useAuth } from '../../services/authContext';
import { SAGAMU_QUARTER_NAMES } from '../../constants/quarters';
import {
  TimelinePost,
  TimelineComment,
  PRESET_TIMELINE_PHOTOS,
  AUDIENCE_OPTIONS,
  getTimelinePosts,
  createTimelinePost,
  togglePostLike,
  addPostComment,
} from '../../services/timelineService';

export const TimelineScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, isGuest } = useAuth();
  const [posts, setPosts] = useState<TimelinePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter state
  const [filterQuarter, setFilterQuarter] = useState('All');

  // Composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState(user?.quarter || 'Itun-Iseje');
  const [selectedAudience, setSelectedAudience] = useState('Public Feed');
  const [submitting, setSubmitting] = useState(false);

  // Active Comment Drawer state
  const [activeCommentPost, setActiveCommentPost] = useState<TimelinePost | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    setLoading(true);
    const data = await getTimelinePosts();
    setPosts(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await getTimelinePosts();
    setPosts(data);
    setRefreshing(false);
  };

  const authorName = user?.fullName || (isGuest ? 'Guest Explorer' : 'Verified Citizen');
  const userKey = user?.id || user?.fullName || (isGuest ? 'guest' : 'citizen');
  const authorAvatar = user?.citizenType === 'indigene' ? '👑' : user?.role === 'security_officer' ? '🛡️' : '👤';

  const handleCreatePost = async () => {
    if (!inputText.trim() && !selectedPhoto) {
      Alert.alert('Empty Post', "Please enter what's on your mind or attach a photo before posting.");
      return;
    }

    setSubmitting(true);
    try {
      const created = await createTimelinePost({
        author_name: authorName,
        author_role: user?.subCategoryLabel || (isGuest ? 'Guest Member' : 'Resident Citizen'),
        author_quarter: selectedQuarter,
        author_avatar: authorAvatar,
        content_text: inputText.trim(),
        image_url: selectedPhoto,
        audience: selectedAudience,
      });

      setPosts([created, ...posts]);
      setInputText('');
      setSelectedPhoto('');
      setIsComposerOpen(false);
      Alert.alert('🎉 Published', 'Your status update is now live on the Sagamu Civic Timeline!');
    } catch {
      Alert.alert('Error', 'Unable to share your post right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId: string) => {
    const res = await togglePostLike(postId, userKey);
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const currentLiked = p.liked_by || [];
          const newLikedBy = res.isLiked
            ? [...currentLiked, userKey]
            : currentLiked.filter((k) => k !== userKey);
          return {
            ...p,
            likes_count: res.likes_count,
            liked_by: newLikedBy,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = async () => {
    if (!commentInput.trim() || !activeCommentPost) return;

    setSubmittingComment(true);
    try {
      const newComment = await addPostComment(
        activeCommentPost.id,
        authorName,
        authorAvatar,
        commentInput.trim()
      );

      const updatedPosts = posts.map((p) => {
        if (p.id === activeCommentPost.id) {
          const cList = p.comments || [];
          return {
            ...p,
            comments: [...cList, newComment],
            comments_count: (p.comments_count || cList.length) + 1,
          };
        }
        return p;
      });

      setPosts(updatedPosts);
      setActiveCommentPost(
        updatedPosts.find((p) => p.id === activeCommentPost.id) || null
      );
      setCommentInput('');
    } catch {
      Alert.alert('Notice', 'Unable to post comment at the moment.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = async (post: TimelinePost) => {
    try {
      await Share.share({
        title: `Sagamu Civic Timeline Update`,
        message: `📢 [${post.author_quarter}] ${post.author_name}: "${post.content_text}"\n\nShared via Sagamu Remo Kingdom Citizen Portal`,
      });
    } catch {}
  };

  const filteredPosts = posts.filter((p) => {
    if (filterQuarter === 'All') return true;
    return p.author_quarter === filterQuarter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="CIVIC TIMELINE"
        subtitle="What's on your mind, Sagamu Remo?"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
      >
        {/* ========================================================================= */}
        {/* FACEBOOK STYLE "WHAT'S ON YOUR MIND?" COMPOSER CARD                      */}
        {/* ========================================================================= */}
        <Card style={styles.composerCard}>
          <View style={styles.composerPromptRow}>
            <View style={styles.userAvatarCircle}>
              <Text style={{ fontSize: 20 }}>{authorAvatar}</Text>
            </View>

            <TouchableOpacity
              style={styles.composerPromptBox}
              onPress={() => setIsComposerOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.composerPromptText} numberOfLines={1}>
                {inputText
                  ? inputText
                  : `What's on your mind, ${authorName.split(' ')[0]}? ✍️`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Action Badges */}
          <View style={styles.composerQuickRow}>
            <TouchableOpacity
              style={styles.composerQuickBtn}
              onPress={() => setIsComposerOpen(true)}
            >
              <Text style={{ fontSize: 16 }}>📸</Text>
              <Text style={styles.composerQuickBtnText}>Photo / Visual</Text>
            </TouchableOpacity>

            <View style={styles.dividerDot} />

            <TouchableOpacity
              style={styles.composerQuickBtn}
              onPress={() => setIsComposerOpen(true)}
            >
              <Text style={{ fontSize: 16 }}>📍</Text>
              <Text style={styles.composerQuickBtnText}>Quarter</Text>
            </TouchableOpacity>

            <View style={styles.dividerDot} />

            <TouchableOpacity
              style={styles.composerQuickBtn}
              onPress={() => setIsComposerOpen(true)}
            >
              <Text style={{ fontSize: 16 }}>👥</Text>
              <Text style={styles.composerQuickBtnText}>Audience</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* ========================================================================= */}
        {/* QUARTER FILTER PILLS                                                      */}
        {/* ========================================================================= */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>FILTER BY ANCESTRAL QUARTER:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {['All', ...SAGAMU_QUARTER_NAMES].map((q) => (
                <TouchableOpacity
                  key={q}
                  onPress={() => setFilterQuarter(q)}
                  style={[
                    styles.quarterFilterPill,
                    filterQuarter === q && styles.quarterFilterPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.quarterFilterText,
                      filterQuarter === q && styles.quarterFilterTextActive,
                    ]}
                  >
                    {q === 'All' ? '🌐 All Quarters' : q}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* ========================================================================= */}
        {/* FEED LIST                                                                 */}
        {/* ========================================================================= */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading royal civic timeline...</Text>
          </View>
        ) : filteredPosts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 44, textAlign: 'center', marginBottom: 8 }}>📜</Text>
            <Text style={styles.emptyTitle}>No posts in {filterQuarter} yet</Text>
            <Text style={styles.emptySub}>
              Be the first to share an update, festival photo, or local achievement!
            </Text>
            <TouchableOpacity
              style={styles.emptyCreateBtn}
              onPress={() => setIsComposerOpen(true)}
            >
              <Text style={styles.emptyCreateBtnText}>✍️ Post What's On Your Mind</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredPosts.map((post) => {
            const isLiked = (post.liked_by || []).includes(userKey);

            return (
              <Card key={post.id} style={styles.postCard}>
                {/* 1. Header: Author, Quarter, Time */}
                <View style={styles.postHeader}>
                  <View style={styles.postAvatarCircle}>
                    <Text style={{ fontSize: 20 }}>{post.author_avatar || '👤'}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <Text style={styles.postAuthorName}>{post.author_name}</Text>
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedBadgeText}>✓</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <Text style={styles.postQuarterPill}>📍 {post.author_quarter}</Text>
                      <Text style={styles.postMetaDot}>•</Text>
                      <Text style={styles.postAudience}>{post.audience}</Text>
                    </View>
                  </View>
                </View>

                {/* 2. Content Text */}
                <Text style={styles.postContent}>{post.content_text}</Text>

                {/* 3. Attached Image (if any) */}
                {Boolean(post.image_url) && (
                  <View style={styles.postImageContainer}>
                    <Image
                      source={{ uri: post.image_url }}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  </View>
                )}

                {/* 4. Reaction Counters Row */}
                <View style={styles.countersRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 13 }}>❤️</Text>
                    <Text style={styles.counterText}>
                      {post.likes_count} {post.likes_count === 1 ? 'like' : 'likes'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setActiveCommentPost(post)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.counterText}>
                      {post.comments_count || (post.comments || []).length} comments
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 5. Interactive Action Buttons: Like, Comment, Share */}
                <View style={styles.actionsBar}>
                  <TouchableOpacity
                    style={[styles.actionBtn, isLiked && styles.actionBtnActive]}
                    onPress={() => handleLike(post.id)}
                  >
                    <Text style={{ fontSize: 16 }}>{isLiked ? '❤️' : '🤍'}</Text>
                    <Text style={[styles.actionBtnText, isLiked && styles.actionBtnTextActive]}>
                      {isLiked ? 'Liked' : 'Like'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => setActiveCommentPost(post)}
                  >
                    <Text style={{ fontSize: 16 }}>💬</Text>
                    <Text style={styles.actionBtnText}>Comment</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleShare(post)}
                  >
                    <Text style={{ fontSize: 16 }}>📤</Text>
                    <Text style={styles.actionBtnText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })
        )}
      </ScrollView>

      {/* ========================================================================= */}
      {/* FULL COMPOSER MODAL ("WHAT'S ON YOUR MIND?")                              */}
      {/* ========================================================================= */}
      <Modal
        visible={isComposerOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsComposerOpen(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.composerModalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity
                onPress={() => setIsComposerOpen(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#64748b' }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {/* Author badge preview */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <View style={styles.userAvatarCircle}>
                  <Text style={{ fontSize: 20 }}>{authorAvatar}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: '#0f172a' }}>
                    {authorName}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#059669', fontWeight: '600' }}>
                    Posting from: {selectedQuarter}
                  </Text>
                </View>
              </View>

              {/* Text Input */}
              <TextInput
                style={styles.composerTextInput}
                placeholder={`What's on your mind, ${authorName.split(' ')[0]}? Share community events, festival updates, or greetings...`}
                placeholderTextColor="#94a3b8"
                multiline
                value={inputText}
                onChangeText={setInputText}
                autoFocus
              />

              {/* Photo Preview if selected */}
              {Boolean(selectedPhoto) && (
                <View style={styles.modalImagePreview}>
                  <Image source={{ uri: selectedPhoto }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removePhotoBtn}
                    onPress={() => setSelectedPhoto('')}
                  >
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>✕ Remove</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Photo Presets selector */}
              <Text style={styles.pickerSectionTitle}>Attach Photo Preset:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                  {PRESET_TIMELINE_PHOTOS.map((p) => (
                    <TouchableOpacity
                      key={p.label}
                      onPress={() => setSelectedPhoto(p.url)}
                      style={[
                        styles.photoPresetPill,
                        selectedPhoto === p.url && styles.photoPresetPillActive,
                      ]}
                    >
                      <Text style={{ fontSize: 13, fontWeight: '700', color: selectedPhoto === p.url ? '#ffffff' : '#334155' }}>
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Ancestral Quarter Selector */}
              <Text style={styles.pickerSectionTitle}>Select Ancestral Quarter:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 6, marginBottom: 16 }}>
                  {SAGAMU_QUARTER_NAMES.map((q) => (
                    <TouchableOpacity
                      key={q}
                      onPress={() => setSelectedQuarter(q)}
                      style={[
                        styles.quarterPill,
                        selectedQuarter === q && styles.quarterPillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.quarterPillText,
                          selectedQuarter === q && styles.quarterPillTextActive,
                        ]}
                      >
                        {q}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Audience Selector */}
              <Text style={styles.pickerSectionTitle}>Audience Visibility:</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
                {AUDIENCE_OPTIONS.map((aud) => (
                  <TouchableOpacity
                    key={aud.id}
                    onPress={() => setSelectedAudience(aud.id)}
                    style={[
                      styles.audienceBtn,
                      selectedAudience === aud.id && styles.audienceBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.audienceBtnText,
                        selectedAudience === aud.id && styles.audienceBtnTextActive,
                      ]}
                    >
                      {aud.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Submit Post Button */}
              <TouchableOpacity
                style={[styles.publishBtn, submitting && { opacity: 0.7 }]}
                onPress={handleCreatePost}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.publishBtnText}>🚀 Share with Community</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      {/* ========================================================================= */}
      {/* COMMENTS MODAL DRAWER                                                     */}
      {/* ========================================================================= */}
      <Modal
        visible={Boolean(activeCommentPost)}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveCommentPost(null)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.commentModalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Replies & Comments</Text>
              <TouchableOpacity
                onPress={() => setActiveCommentPost(null)}
                style={styles.modalCloseBtn}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#64748b' }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {activeCommentPost && (
                <>
                  <View style={styles.originalPostSnippet}>
                    <Text style={{ fontWeight: '800', color: '#0f172a', marginBottom: 2 }}>
                      {activeCommentPost.author_name} ({activeCommentPost.author_quarter})
                    </Text>
                    <Text style={{ color: '#475569', fontSize: 13 }} numberOfLines={3}>
                      {activeCommentPost.content_text}
                    </Text>
                  </View>

                  <Text style={{ fontSize: 13, fontWeight: '800', color: '#64748b', marginTop: 14, marginBottom: 8 }}>
                    COMMENTS ({(activeCommentPost.comments || []).length})
                  </Text>

                  {(!activeCommentPost.comments || activeCommentPost.comments.length === 0) ? (
                    <Text style={{ color: '#94a3b8', fontStyle: 'italic', marginVertical: 12 }}>
                      No comments yet. Write the first response below!
                    </Text>
                  ) : (
                    activeCommentPost.comments.map((c) => (
                      <View key={c.id} style={styles.commentItem}>
                        <View style={styles.commentAvatarCircle}>
                          <Text style={{ fontSize: 15 }}>{c.author_avatar || '👤'}</Text>
                        </View>
                        <View style={styles.commentBubble}>
                          <Text style={styles.commentAuthor}>{c.author_name}</Text>
                          <Text style={styles.commentBody}>{c.comment_text}</Text>
                        </View>
                      </View>
                    ))
                  )}
                </>
              )}
            </ScrollView>

            {/* Comment Input Bar */}
            <View style={styles.commentInputBar}>
              <TextInput
                style={styles.commentTextInput}
                placeholder="Write a comment..."
                placeholderTextColor="#94a3b8"
                value={commentInput}
                onChangeText={setCommentInput}
              />
              <TouchableOpacity
                style={[styles.sendCommentBtn, submittingComment && { opacity: 0.6 }]}
                onPress={handleAddComment}
                disabled={submittingComment}
              >
                {submittingComment ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={styles.sendCommentBtnText}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  composerCard: {
    padding: 14,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  composerPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#064e3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  composerPromptBox: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  composerPromptText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  composerQuickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  composerQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  composerQuickBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  dividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cbd5e1',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
  },
  quarterFilterPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quarterFilterPillActive: {
    backgroundColor: '#064e3b',
    borderColor: '#064e3b',
  },
  quarterFilterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  quarterFilterTextActive: {
    color: '#ffffff',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  emptySub: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  emptyCreateBtn: {
    backgroundColor: '#064e3b',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  emptyCreateBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  postCard: {
    marginBottom: 14,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  postAvatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAuthorName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  verifiedBadge: {
    backgroundColor: '#1877F2',
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  postQuarterPill: {
    fontSize: 11,
    fontWeight: '700',
    color: '#064e3b',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  postMetaDot: {
    fontSize: 11,
    color: '#94a3b8',
  },
  postAudience: {
    fontSize: 11,
    color: '#64748b',
  },
  postContent: {
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 20,
    marginBottom: 10,
  },
  postImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  countersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 8,
  },
  counterText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionBtnActive: {
    backgroundColor: '#fee2e2',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
  },
  actionBtnTextActive: {
    color: '#dc2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  composerModalSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  commentModalSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  modalCloseBtn: {
    padding: 6,
  },
  composerTextInput: {
    minHeight: 100,
    fontSize: 15,
    color: '#0f172a',
    textAlignVertical: 'top',
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 14,
  },
  modalImagePreview: {
    position: 'relative',
    marginBottom: 14,
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 140,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  pickerSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 6,
  },
  photoPresetPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  photoPresetPillActive: {
    backgroundColor: '#064e3b',
    borderColor: '#064e3b',
  },
  quarterPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  quarterPillActive: {
    backgroundColor: '#064e3b',
    borderColor: '#064e3b',
  },
  quarterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  quarterPillTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  audienceBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
  },
  audienceBtnActive: {
    backgroundColor: '#064e3b',
    borderColor: '#064e3b',
  },
  audienceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  audienceBtnTextActive: {
    color: '#ffffff',
  },
  publishBtn: {
    backgroundColor: '#064e3b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  publishBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  originalPostSnippet: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  commentItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  commentAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 10,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 2,
  },
  commentBody: {
    fontSize: 13,
    color: '#334155',
  },
  commentInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 10,
    backgroundColor: '#ffffff',
  },
  commentTextInput: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#0f172a',
  },
  sendCommentBtn: {
    backgroundColor: '#064e3b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  sendCommentBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
});
