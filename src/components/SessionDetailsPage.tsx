/**
 * SessionDetailsPage - Full-screen session details view
 * Shows session metadata, message history, and input to continue conversation
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Calendar, 
  Hash,
  Send,
  Activity,
  Mail,
  Mic,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
} from 'lucide-react-native';
import { colors, typography, spacing } from '../theme';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  tokens?: number;
  cost?: string;
}

interface SessionDetailsPageProps {
  session: {
    id: string;
    title: string;
    agentName: string;
    createdAt: string;
    userEmail?: string;
    tokens?: number;
    cost?: string;
  };
  onClose: () => void;
}

// Mock messages for UI testing
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'user',
    content: 'What are our key priorities for Q2?',
  },
  {
    id: '2',
    type: 'agent',
    content: 'Based on our roadmap discussions, the key priorities for Q2 2026 are:\n\n1. Launch the agentic automation platform\n2. Complete HubSpot integration\n3. Expand the sales team\n4. Finalize marketing campaign strategy',
    tokens: 1250,
    cost: '$0.0375',
  },
  {
    id: '3',
    type: 'user',
    content: 'Can you break down the platform launch timeline?',
  },
  {
    id: '4',
    type: 'agent',
    content: 'Here\'s the platform launch timeline:\n\n**April**: Beta testing with 5 pilot customers\n**May**: Refinement based on feedback, security audit\n**June**: General availability release, marketing push\n\nKey milestones include completing the agent SDK, integrating payment processing, and finalizing documentation.',
    tokens: 980,
    cost: '$0.0294',
  },
];

export default function SessionDetailsPage({ session, onClose }: SessionDetailsPageProps) {
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    // TODO: Send message to API
    console.log('Send message:', inputText);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowLeft size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          {/* Title Section */}
          <View style={styles.titleSection}>
            {/* Agent Name */}
            <Text style={styles.agentLabel}>{session.agentName}</Text>
            
            {/* Session Title */}
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {session.title}
            </Text>

            {/* Metadata Row */}
            <View style={styles.metadataRow}>
              {/* Date */}
              <View style={styles.metadataItem}>
                <Calendar size={12} color={colors.text.secondary} />
                <Text style={styles.metadataText}>{formatDate(session.createdAt)}</Text>
              </View>

              {/* Email */}
              {session.userEmail && (
                <View style={[styles.metadataItem, styles.metadataItemBordered]}>
                  <Mail size={12} color={colors.text.secondary} />
                  <Text style={styles.metadataText}>{session.userEmail.toUpperCase()}</Text>
                </View>
              )}

              {/* Session ID */}
              <View style={[styles.metadataItem, styles.metadataItemBordered]}>
                <Hash size={12} color={colors.text.secondary} />
                <Text style={styles.metadataText}>***{session.id.slice(-5)}</Text>
              </View>

              {/* Tokens */}
              {session.tokens && (
                <Text style={[styles.metadataText, styles.metadataItemBordered]}>
                  {session.tokens.toLocaleString()} tokens
                </Text>
              )}

              {/* Cost */}
              {session.cost && (
                <Text style={[styles.metadataText, styles.metadataItemBordered]}>
                  {session.cost}
                </Text>
              )}
            </View>
          </View>

          {/* Activity Icon */}
          <TouchableOpacity style={styles.activityButton}>
            <Activity size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Area */}
      <ScrollView 
        style={styles.messagesArea}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_MESSAGES.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.type === 'user' ? styles.userMessage : styles.agentMessage
            ]}
          >
            {/* Message Label */}
            <Text style={styles.messageLabel}>
              {message.type === 'user' ? 'YOU' : session.agentName.toUpperCase()}
            </Text>

            {/* Message Content */}
            <Text style={styles.messageText}>{message.content}</Text>

            {/* Agent Message Metadata */}
            {message.type === 'agent' && (message.tokens || message.cost) && (
              <View style={styles.messageMetadata}>
                {message.tokens && (
                  <Text style={styles.messageMetadataText}>
                    {message.tokens.toLocaleString()} tokens
                  </Text>
                )}
                {message.cost && (
                  <Text style={[styles.messageMetadataText, message.tokens && styles.messageMetadataBordered]}>
                    {message.cost}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Bar */}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Continue the conversation..."
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          multiline
          returnKeyType="default"
        />
        
        {/* Voice Button */}
        <TouchableOpacity
          onPress={() => console.log('Voice input')}
          style={styles.voiceButton}
        >
          <Mic size={20} color={colors.text.secondary} />
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSend}
          disabled={!inputText.trim()}
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled
          ]}
        >
          <Send size={20} color={inputText.trim() ? colors.text.primary : colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.navButton}>
          <ChevronLeft size={24} color={colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <ChevronRight size={24} color={colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButtonCenter}>
          <Plus size={28} color={colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>25</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <MoreHorizontal size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: colors.background,
    zIndex: 100, // Above all menus and panels
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(24, 24, 27, 0.5)', // zinc-900 with 50% opacity
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
    marginTop: spacing.xs,
  },
  titleSection: {
    flex: 1,
    minWidth: 0,
  },
  agentLabel: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metadataItemBordered: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: spacing.sm,
  },
  metadataText: {
    fontFamily: 'Courier New',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: 'rgba(156, 163, 175, 0.8)', // Muted
  },
  messagesArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  messageContainer: {
    backgroundColor: 'rgba(39, 39, 42, 0.5)', // zinc-800 with transparency
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  userMessage: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  agentMessage: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  messageLabel: {
    fontFamily: 'Courier New',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  messageMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  messageMetadataText: {
    fontFamily: 'Courier New',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'rgba(156, 163, 175, 0.6)',
  },
  messageMetadataBordered: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: spacing.sm,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(24, 24, 27, 0.95)', // zinc-900 with 95% opacity
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(39, 39, 42, 0.5)', // zinc-800 with 50% opacity
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
    color: colors.text.primary,
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(39, 39, 42, 1)', // zinc-800
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  activityButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
    marginTop: spacing.xs,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(39, 39, 42, 1)', // zinc-800
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(24, 24, 27, 0.95)', // zinc-900
  },
  navButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonCenter: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue with transparency
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    minWidth: 32,
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
});
