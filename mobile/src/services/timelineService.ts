// mobile/src/services/timelineService.ts
// Civic Timeline Service ("What's on your mind?") for Sagamu Remo Mobile App

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../database/syncManager';

export interface TimelineComment {
  id: string;
  author_name: string;
  author_avatar: string;
  comment_text: string;
  created_at: string;
}

export interface TimelinePost {
  id: string;
  author_name: string;
  author_role: string;
  author_quarter: string;
  author_avatar: string;
  content_text: string;
  image_url: string;
  audience: string;
  likes_count: number;
  liked_by: string[];
  comments_count: number;
  comments: TimelineComment[];
  created_at: string;
}

const STORAGE_KEY = 'sagamu_mobile_timeline_posts';

export const PRESET_TIMELINE_PHOTOS = [
  {
    label: '👑 Festival',
    url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '💡 Solar',
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '🧵 Adire',
    url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: '🛡️ Patrol',
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  },
];

export const AUDIENCE_OPTIONS = [
  { id: 'Public Feed', label: '🌐 Public Feed', desc: 'Visible to everyone' },
  { id: 'Indigenes Only', label: '🏛️ Indigenes Only', desc: 'Verified indigenes & agbole' },
  { id: 'Ward Watch', label: '🛡️ Ward Watch', desc: 'Local security & residents' },
];

export const SEED_TIMELINE_POSTS: TimelinePost[] = [
  {
    id: 'POST-101',
    author_name: 'HRH Akarigbo Palace Secretariat',
    author_role: 'Royal Court Protocol',
    author_quarter: 'Itun-Oke',
    author_avatar: '👑',
    content_text: 'Ẹ kú ọdún, ẹ kú ìyè dún! 🌟 Preparations for the 50th Golden Jubilee Sagamu Day Festival are in full gear at Aafin Akarigbo. Youth cultural troupes and age-grade delegations are invited for ceremonial auditions this Saturday. Let us celebrate our royal heritage with dignity and harmony! #SagamuRemo #Sagamu DayJubilee #Heritage',
    image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    audience: 'Public Feed',
    likes_count: 64,
    liked_by: ['usr_cit_001'],
    comments_count: 2,
    comments: [
      {
        id: 'c1',
        author_name: 'Chief Olatunji Orowa',
        author_avatar: '🏛️',
        comment_text: 'Kábíyèsí o! The elders of Torungbuwa are fully ready with the ancestral masquerade troupe.',
        created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: 'c2',
        author_name: 'Segun Adebayo (Youth President)',
        author_avatar: '🦅',
        comment_text: 'The youth wing has registered over 120 volunteers for crowd marshaling and festival logistics!',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'POST-102',
    author_name: 'Engr. Dapo Saliu',
    author_role: 'Civic Infrastructure Taskforce',
    author_quarter: 'Itun-Iseje',
    author_avatar: '⚡',
    content_text: 'Proud to share that Phase 2 of our Community Solar Streetlights along the Itun-Iseje market corridor is officially completed! Over 45 high-lumen solar lamps are now active, keeping our night traders safe and vibrant. Big thanks to SDA and our diaspora donors! 💡✨ #CivicProgress #LightUpSagamu',
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    audience: 'Public Feed',
    likes_count: 92,
    liked_by: [],
    comments_count: 1,
    comments: [
      {
        id: 'c3',
        author_name: 'Iya Oloja Itun-Iseje',
        author_avatar: '🧺',
        comment_text: 'Thank you Engr. Dapo! We can now sell our fresh farm produce till 9 PM with complete peace of mind.',
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'POST-103',
    author_name: 'Mrs. Folashade Adeleke',
    author_role: 'Adire Artisans Guild',
    author_quarter: 'Itun-Lisa',
    author_avatar: '🎨',
    content_text: 'Fresh batch of genuine Sagamu Adire Eleko and indigo-dyed fabrics ready for the upcoming trade exhibition! Our young women apprentices spent 3 weeks perfecting these traditional patterns. Preserving our ancestral craft while creating sustainable livelihoods! 🧵💙 #MadeInSagamu #AdireHeritage #Empowerment',
    image_url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
    audience: 'Public Feed',
    likes_count: 51,
    liked_by: [],
    comments_count: 1,
    comments: [
      {
        id: 'c4',
        author_name: 'Dr. Folashade Adeyemi-Clark (London)',
        author_avatar: '✈️',
        comment_text: 'Can we order batches shipped to the UK diaspora chapter for our cultural gala next month?',
        created_at: new Date(Date.now() - 3600000 * 10).toISOString(),
      },
    ],
    created_at: new Date(Date.now() - 3600000 * 16).toISOString(),
  },
  {
    id: 'POST-104',
    author_name: 'Commander Kayode Adeleke',
    author_role: 'Joint Patrol Commander',
    author_quarter: 'Expressway / Tollgate Axis',
    author_avatar: '🛡️',
    content_text: 'Security Advisory: Routine night patrols across the Sagamu-Benin Expressway interchange and inner ring-road corridors have been intensified. Please keep emergency speed dials handy in your Sagamu Mobile App. If you notice any suspicious gathering, use the SOS beacon or Whistleblower hotline immediately. 🚓🚨 #SagamuSafety #Vigilance',
    image_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    audience: 'Public Feed',
    likes_count: 78,
    liked_by: [],
    comments_count: 0,
    comments: [],
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export async function getTimelinePosts(): Promise<TimelinePost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/community?type=timeline`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok && data && Array.isArray(data.data) && data.data.length > 0) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
      return data.data;
    }
  } catch (err) {
    console.warn('[Timeline Cloud Fetch Fallback]:', err);
  }

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TIMELINE_POSTS));
  return SEED_TIMELINE_POSTS;
}

export async function createTimelinePost(payload: {
  author_name: string;
  author_role?: string;
  author_quarter?: string;
  author_avatar?: string;
  content_text: string;
  image_url?: string;
  audience?: string;
}): Promise<TimelinePost> {
  const current = await getTimelinePosts();
  const newPost: TimelinePost = {
    id: `POST-${Date.now()}`,
    author_name: payload.author_name,
    author_role: payload.author_role || 'Verified Citizen',
    author_quarter: payload.author_quarter || 'Itun-Iseje',
    author_avatar: payload.author_avatar || '👤',
    content_text: payload.content_text,
    image_url: payload.image_url || '',
    audience: payload.audience || 'Public Feed',
    likes_count: 0,
    liked_by: [],
    comments_count: 0,
    comments: [],
    created_at: new Date().toISOString(),
  };

  const updated = [newPost, ...current];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  try {
    await fetch(`${API_BASE_URL}/api/community?type=timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create_post', ...payload }),
    });
  } catch (err) {
    console.warn('[Timeline Cloud Post Fallback]:', err);
  }

  return newPost;
}

export async function togglePostLike(
  postId: string,
  userKey: string
): Promise<{ likes_count: number; isLiked: boolean }> {
  const current = await getTimelinePosts();
  let result = { likes_count: 0, isLiked: false };

  const updated = current.map((p) => {
    if (p.id === postId) {
      const likedBy = p.liked_by || [];
      const alreadyLiked = likedBy.includes(userKey);
      const newLikedBy = alreadyLiked
        ? likedBy.filter((k) => k !== userKey)
        : [...likedBy, userKey];
      const newCount = Math.max(0, alreadyLiked ? p.likes_count - 1 : p.likes_count + 1);
      result = { likes_count: newCount, isLiked: !alreadyLiked };
      return {
        ...p,
        likes_count: newCount,
        liked_by: newLikedBy,
      };
    }
    return p;
  });

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  try {
    await fetch(`${API_BASE_URL}/api/community?type=timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'like_post', postId, userId: userKey }),
    });
  } catch (err) {
    console.warn('[Timeline Cloud Like Fallback]:', err);
  }

  return result;
}

export async function addPostComment(
  postId: string,
  author_name: string,
  author_avatar: string,
  comment_text: string
): Promise<TimelineComment> {
  const current = await getTimelinePosts();
  const newComment: TimelineComment = {
    id: `cmt_${Date.now()}`,
    author_name: author_name || 'Verified Citizen',
    author_avatar: author_avatar || '👤',
    comment_text: comment_text.trim(),
    created_at: new Date().toISOString(),
  };

  const updated = current.map((p) => {
    if (p.id === postId) {
      const comments = p.comments || [];
      return {
        ...p,
        comments: [...comments, newComment],
        comments_count: (p.comments_count || comments.length) + 1,
      };
    }
    return p;
  });

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  try {
    await fetch(`${API_BASE_URL}/api/community?type=timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add_comment',
        postId,
        author_name,
        author_avatar,
        comment_text,
      }),
    });
  } catch (err) {
    console.warn('[Timeline Cloud Comment Fallback]:', err);
  }

  return newComment;
}
