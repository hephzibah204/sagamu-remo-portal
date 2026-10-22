import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Colors, Spacing, Radius, Typography, Shadows } from '../../theme';
import { Button } from '../../components/Button';
import { useAuth } from '../../services/authContext';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    useLogo: true,
    icon: '👑',
    title: 'Welcome to Sagamu Remo',
    subtitle: 'Gateway Kingdom of Heritage & Enterprise',
    description:
      'The official mobile portal of the ancient Remo kingdom. Connecting indigenes, residents, and diaspora citizens worldwide.',
  },
  {
    useLogo: false,
    icon: '📱',
    title: '100% Offline Access',
    subtitle: 'Civic Knowledge in Your Pocket',
    description:
      'Read palace news, study the lineage of the The Akarigbo of Remoland, listen to traditional Oriki, and access emergency helplines even without mobile data.',
  },
  {
    useLogo: false,
    icon: '🏛️',
    title: 'World-Class Civic Services',
    subtitle: 'Direct Palace & Community Portal',
    description:
      'Verify digital ID cards, book royal audiences with Kabiyesi, report community incidents, and support town development projects.',
  },
];

export const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setGuestMode } = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const userInteractedRef = useRef(false);

  // Auto-play timer: advances slides smoothly every 5 seconds if user hasn't scrolled manually
  useEffect(() => {
    const timer = setInterval(() => {
      if (!userInteractedRef.current && flatListRef.current) {
        setActiveSlide((prev) => {
          const next = (prev + 1) % SLIDES.length;
          flatListRef.current?.scrollToIndex({ index: next, animated: true });
          return next;
        });
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index >= 0 && index < SLIDES.length && index !== activeSlide) {
      setActiveSlide(index);
    }
  };

  const handleScrollBeginDrag = () => {
    userInteractedRef.current = true;
  };

  const goToSlide = (index: number) => {
    userInteractedRef.current = true;
    setActiveSlide(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleExploreAsGuest = () => {
    setGuestMode(true);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Royal Header Badge with Official Crest & State Seal */}
      <View style={styles.headerBadge}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerState}>OGUN STATE · NIGERIA</Text>
      </View>

      {/* Swipeable Carousel Section */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onScrollBeginDrag={handleScrollBeginDrag}
          keyExtractor={(_, index) => `welcome-slide-${index}`}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.slideItem, { width }]}>
              <View style={styles.slideContent}>
                <View style={styles.iconCircle}>
                  {item.useLogo ? (
                    <Image
                      source={require('../../../assets/icon.png')}
                      style={styles.slideLogo}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.slideEmoji}>{item.icon}</Text>
                  )}
                </View>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
                <Text style={styles.slideDescription}>{item.description}</Text>
              </View>
            </View>
          )}
        />

        {/* Swipe Indicators */}
        <View style={styles.indicatorRow}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToSlide(i)}
              style={[
                styles.indicatorDot,
                activeSlide === i && styles.indicatorDotActive,
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Create Citizen Account"
          variant="secondary"
          size="lg"
          onPress={() => navigation.navigate('Register')}
          style={styles.actionBtn}
        />

        <Button
          title="Sign In with Account / Biometrics"
          variant="primary"
          size="md"
          onPress={() => navigation.navigate('Login')}
          style={styles.actionBtn}
        />

        <TouchableOpacity
          onPress={handleExploreAsGuest}
          style={styles.guestLink}
          activeOpacity={0.7}
        >
          <Text style={styles.guestLinkText}>
            Explore as Guest · No Sign In Required ➔
          </Text>
        </TouchableOpacity>

        {/* Dedicated Entry for Officers & Protocol */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminLogin')}
          style={styles.officerTerminalBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.officerTerminalEmoji}>🛡️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.officerTerminalTitle}>Security & Palace Protocol Portal</Text>
            <Text style={styles.officerTerminalSub}>Police · Vigilante · Protocol · SDA Admin</Text>
          </View>
          <Text style={styles.officerTerminalArrow}>➔</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Access town news, emergency lines, and royal history without logging in.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
  },
  headerBadge: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
    gap: 4,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerState: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#a7f3d0',
    fontWeight: '700',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  slideContent: {
    alignItems: 'center',
    maxWidth: 340,
  },
  iconCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.elevated,
  },
  slideLogo: {
    width: 86,
    height: 86,
  },
  slideEmoji: {
    fontSize: 48,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    fontSize: 14,
    color: Colors.goldSoft,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  slideDescription: {
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 22,
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  indicatorDotActive: {
    width: 24,
    backgroundColor: Colors.gold,
  },
  actionsContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: 12,
    ...Shadows.card,
  },
  actionBtn: {
    width: '100%',
  },
  guestLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  guestLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  officerTerminalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0c0604',
    borderWidth: 1,
    borderColor: 'rgba(201, 150, 58, 0.4)',
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  officerTerminalEmoji: {
    fontSize: 22,
  },
  officerTerminalTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.goldLight,
  },
  officerTerminalSub: {
    fontSize: 10,
    color: 'rgba(245, 237, 216, 0.7)',
    marginTop: 2,
  },
  officerTerminalArrow: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.gold,
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
