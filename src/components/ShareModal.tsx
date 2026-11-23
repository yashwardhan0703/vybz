import { useState } from 'react';
import { X, Copy, Check, MessageCircle, Sparkles, Loader2, ArrowUpRight } from 'lucide-react';
import { shareStoryToInstagram } from '../utils/storyShare';
import { parseTrackMetadata } from '../utils/mediaHelpers';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  artist: string;
  artworkUrl?: string;
  vibeName?: string;
  customUrl?: string;
  isPlaylist?: boolean;
  isAppShare?: boolean;
  onToast: (msg: string) => void;
}

export default function ShareModal({
  isOpen,
  onClose,
  title,
  artist,
  artworkUrl,
  vibeName,
  customUrl,
  isPlaylist,
  isAppShare,
  onToast,
}: ShareModalProps) {
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawTitle = title || 'VybZ Music';
  const rawArtist = artist || 'Top Indian Music';
  const { displayTitle, displaySubtitle } = parseTrackMetadata(rawTitle, rawArtist);

  const songTitle = isAppShare ? 'VybZ Music' : isPlaylist ? rawTitle : displayTitle;
  const artistName = isAppShare ? '100% Ad-Free Indian Music' : isPlaylist ? rawArtist : displaySubtitle;
  const shareTargetUrl = customUrl || (typeof window !== 'undefined' ? window.location.href : 'https://vybzmusic.online');

  // 1. Instagram Story Share
  const handleInstagramShare = async () => {
    setIsGeneratingStory(true);
    try {
      const res = await shareStoryToInstagram({
        title: isAppShare ? 'VybZ Music' : songTitle,
        artist: isAppShare ? '100% Ad-Free Indian Music' : artistName,
        artworkUrl: isAppShare ? '/logo.png' : artworkUrl,
        vibeName: isAppShare ? 'AD-FREE AUDIO' : isPlaylist ? 'PLAYLIST' : vibeName,
        shareUrl: shareTargetUrl,
      });

      if (res === 'shared') {
        onToast('Opening Instagram Story... 📸');
      } else {
        onToast('Story poster saved to your downloads! 📸');
      }
      onClose();
    } catch (err) {
      console.warn('[ShareModal] Story generation failed:', err);
      onToast('Could not generate story card, link copied instead!');
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // 2. WhatsApp Share
  const handleWhatsAppShare = () => {
    let text = '';
    if (isAppShare) {
      text = `🔥 VybZ Music – 100% Ad-Free Indian Music\nSpotify ke ads se chhutkara!\n\n✦ Zero Ads & Zero Interruptions\n✦ Screen lock / Background me bhi chalta hai\n✦ Curated Mood Stations (Chai Tapri, Late Night Lo-Fi, Sufi)\n✦ Daily Top 25 Trending Hits\n\n🌐 Web Player: https://vybzmusic.online\n📲 Download Android App: https://vybzmusic.online/download`;
    } else if (isPlaylist) {
      text = `🎧 Shared Playlist on VybZ Music:\n"${songTitle}"\n✨ ${artistName}\n\n▶ Listen Ad-Free: ${shareTargetUrl}\n📲 Get App (Free Background Play): https://vybzmusic.online/download`;
    } else {
      text = `🎧 Now Playing on VybZ Music:\n"${songTitle}"\n${artistName && !/VybZ/i.test(artistName) ? `✨ ${artistName}\n` : ''}\n▶ Listen Ad-Free: https://vybzmusic.online/\n📲 Get App (Free Background Play): https://vybzmusic.online/download`;
    }

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  // 3. Copy Link
  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareTargetUrl);
        setCopied(true);
        onToast('Link copied to clipboard! 🔗');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      onToast('Failed to copy link');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-400/30 bg-[#0d131f] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
              <Sparkles size={14} />
            </span>
            <h3 className="text-base font-bold text-white">
              {isAppShare ? 'Share VybZ Music' : isPlaylist ? 'Share Playlist' : 'Share Music'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            aria-label="Close share dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Current Song / Playlist / App Preview Banner */}
        <div className="my-4 flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="size-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/50">
            {artworkUrl ? (
              <img src={artworkUrl} alt={songTitle} className="size-full object-cover" />
            ) : isAppShare ? (
              <img src="/logo.png" alt="VybZ Music" className="size-full object-contain p-1" />
            ) : (
              <div className="grid size-full place-items-center text-amber-400 text-xl font-bold">
                {isPlaylist ? '📂' : '🎵'}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">
              {isAppShare ? 'VybZ Music' : songTitle}
            </p>
            <p className="truncate text-xs text-white/60">
              {isAppShare ? '100% Ad-Free Indian Music Streaming' : artistName}
            </p>
            {(vibeName || isAppShare) && (
              <span className="mt-1 inline-block text-[10px] font-semibold text-amber-300">
                ✦ {isAppShare ? 'OFFICIAL APP' : vibeName}
              </span>
            )}
          </div>
        </div>

        {/* Share Options Grid */}
        <div className="space-y-2.5">
          {/* OPTION 1: Instagram Story */}
          <button
            type="button"
            onClick={handleInstagramShare}
            disabled={isGeneratingStory}
            className="group relative flex w-full items-center justify-between gap-3 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-amber-900/30 p-3.5 text-left transition hover:border-pink-400/60 hover:brightness-110 active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md">
                {isGeneratingStory ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <span className="text-base font-black">IG</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-white truncate">Instagram Story</p>
                  <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    Auto Poster ✦
                  </span>
                </div>
                <p className="text-xs text-white/60 truncate">
                  {isGeneratingStory ? 'Creating 9:16 aesthetic poster...' : 'Share 9:16 aesthetic card directly'}
                </p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-white/40 group-hover:text-pink-300 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          {/* OPTION 2: WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-3.5 text-left transition hover:border-emerald-400/50 hover:bg-emerald-950/30 active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageCircle size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">Share on WhatsApp</p>
                <p className="text-xs text-white/60">Send link directly to friends or groups</p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-white/40 transition-all shrink-0" />
          </button>

          {/* OPTION 3: Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-left transition hover:border-amber-400/40 hover:bg-white/[0.06] active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">
                  {copied ? 'Copied to Clipboard!' : 'Copy Direct Link'}
                </p>
                <p className="text-xs text-white/60 truncate">{shareTargetUrl}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-300 shrink-0">
              {copied ? 'Done' : 'Copy'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
