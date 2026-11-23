/**
 * VybZ Music - Instagram Story Aesthetic Card Generator & Native Share Engine
 * Generates 1080x1920 (9:16) Spotify-grade viral story posters using offscreen HTML5 canvas.
 */

import { parseTrackMetadata } from './mediaHelpers';

export interface StoryCardOptions {
  title: string;
  artist: string;
  artworkUrl?: string;
  vibeName?: string;
  accentColor?: string;
  shareUrl?: string;
}

/** Helper to wrap text into multiple lines on canvas */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = ctx.measureText(testLine).width;
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length === 2) break; // Max 2 lines for title
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine && lines.length < 2) {
    lines.push(currentLine);
  }
  return lines;
}

/** Draws rounded rectangle with fallback */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
  }
  ctx.closePath();
}

/** Safe image loader with CORS handling */
function loadSafeImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Retry without crossOrigin or fail
      const fallback = new Image();
      fallback.onload = () => resolve(fallback);
      fallback.onerror = reject;
      fallback.src = url;
    };
    img.src = url;
  });
}

/**
 * Generates an aesthetic 1080x1920 (9:16) Instagram Story Poster
 */
export async function generateStoryCardBlob(
  options: StoryCardOptions
): Promise<{ blob: Blob; dataUrl: string }> {
  const width = 1080;
  const height = 1920;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  const rawTitle = (options.title || 'VybZ Hit').trim();
  const rawArtist = (options.artist || 'Top Indian Music').trim();
  const { displayTitle, displaySubtitle } = parseTrackMetadata(rawTitle, rawArtist);
  const vibeName = options.vibeName ? options.vibeName.toUpperCase() : 'DAILY TOP 25 TRENDING';

  // 1. BASE BACKGROUND: Deep midnight obsidian
  ctx.fillStyle = '#070a10';
  ctx.fillRect(0, 0, width, height);

  // 2. AMBIENT RADIAL GLOWS (Subtle, elegant atmosphere)
  // Top-center ambient amber/gold glow
  const topGlow = ctx.createRadialGradient(width / 2, 450, 40, width / 2, 450, 680);
  topGlow.addColorStop(0, 'rgba(245, 158, 11, 0.32)');
  topGlow.addColorStop(0.5, 'rgba(217, 119, 6, 0.12)');
  topGlow.addColorStop(1, 'rgba(7, 10, 16, 0)');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, width, height);

  // Bottom subtle ruby/purple glow
  const botGlow = ctx.createRadialGradient(width / 2, 1400, 30, width / 2, 1400, 580);
  botGlow.addColorStop(0, 'rgba(225, 29, 72, 0.16)');
  botGlow.addColorStop(0.6, 'rgba(124, 58, 237, 0.08)');
  botGlow.addColorStop(1, 'rgba(7, 10, 16, 0)');
  ctx.fillStyle = botGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. TOP PILL: Minimal station or vibe badge
  const badgeY = 250;
  ctx.save();
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const badgeText = `✦ ${vibeName} ✦`;
  const badgeWidth = ctx.measureText(badgeText).width + 50;
  const badgeX = (width - badgeWidth) / 2;

  // Badge background
  ctx.fillStyle = 'rgba(245, 158, 11, 0.10)';
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.30)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, badgeX, badgeY, badgeWidth, 48, 24);
  ctx.fill();
  ctx.stroke();

  // Badge text
  ctx.fillStyle = '#fcd34d';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, width / 2, badgeY + 24);
  ctx.restore();

  // 4. CENTER ALBUM ARTWORK CONTAINER
  const artSize = 640;
  const artX = (width - artSize) / 2;
  const artY = 370;
  const artRadius = 32;

  let loadedImg: HTMLImageElement | null = null;
  if (options.artworkUrl) {
    try {
      loadedImg = await loadSafeImage(options.artworkUrl);
    } catch {
      loadedImg = null;
    }
  }

  // Artwork drop shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.80)';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 20;
  ctx.fillStyle = '#111827';
  drawRoundedRect(ctx, artX, artY, artSize, artSize, artRadius);
  ctx.fill();
  ctx.restore();

  // Clip and draw image (Smart square center-crop eliminates 16:9 YouTube side watermarks!)
  ctx.save();
  drawRoundedRect(ctx, artX, artY, artSize, artSize, artRadius);
  ctx.clip();

  if (loadedImg) {
    const nw = loadedImg.naturalWidth || loadedImg.width;
    const nh = loadedImg.naturalHeight || loadedImg.height;
    const minDim = Math.min(nw, nh);
    const sx = (nw - minDim) / 2;
    const sy = (nh - minDim) / 2;
    ctx.drawImage(loadedImg, sx, sy, minDim, minDim, artX, artY, artSize, artSize);
  } else {
    // Elegant fallback vinyl artwork
    const fallbackGrad = ctx.createLinearGradient(artX, artY, artX + artSize, artY + artSize);
    fallbackGrad.addColorStop(0, '#f59e0b');
    fallbackGrad.addColorStop(1, '#ea580c');
    ctx.fillStyle = fallbackGrad;
    ctx.fillRect(artX, artY, artSize, artSize);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 110px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎵', artX + artSize / 2, artY + artSize / 2);
  }

  // Subtle inner border over image
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 5. TRACK TITLE & ARTIST TYPOGRAPHY (Clean & unpolluted)
  const metaY = artY + artSize + 85;

  ctx.save();
  ctx.textAlign = 'center';

  // Title: Cleaned and prominent
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 16;

  const titleLines = wrapText(ctx, displayTitle, 860);
  let curY = metaY;
  for (const line of titleLines) {
    ctx.fillText(line, width / 2, curY);
    curY += 60;
  }

  // Subtitle / Movie / Artist: Crisp & understated
  ctx.shadowBlur = 0;
  ctx.font = '600 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
  ctx.fillText(displaySubtitle, width / 2, curY + 12);

  ctx.restore();

  // 6. SUBTLE MICRO SOUNDWAVE BARS (Clean minimal aesthetic)
  const waveY = curY + 80;
  const barCount = 18;
  const barWidth = 6;
  const barGap = 12;
  const totalWaveWidth = barCount * (barWidth + barGap);
  const startX = (width - totalWaveWidth) / 2;

  ctx.save();
  for (let i = 0; i < barCount; i++) {
    const x = startX + i * (barWidth + barGap);
    const sinFactor = Math.sin((i / (barCount - 1)) * Math.PI);
    const barHeight = Math.max(8, Math.round(sinFactor * 30 + ((i % 3) * 4)));
    const by = waveY - barHeight / 2;

    const waveGrad = ctx.createLinearGradient(0, by, 0, by + barHeight);
    waveGrad.addColorStop(0, '#f59e0b');
    waveGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = waveGrad;

    drawRoundedRect(ctx, x, by, barWidth, barHeight, 3);
    ctx.fill();
  }
  ctx.restore();

  // 7. FOOTER BRANDING CARD: Clean VybZ Gold Badge with App link
  const footerY = 1620;
  const footerWidth = 540;
  const footerHeight = 100;
  const footerX = (width - footerWidth) / 2;

  ctx.save();
  // Glassmorphic pill
  ctx.fillStyle = 'rgba(15, 21, 34, 0.90)';
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  drawRoundedRect(ctx, footerX, footerY, footerWidth, footerHeight, 50);
  ctx.fill();
  ctx.stroke();

  // VybZ text + Tagline
  ctx.shadowBlur = 0;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('✦ VYBZ MUSIC ✦', width / 2, footerY + 38);

  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText('vybzmusic.online • Get App', width / 2, footerY + 70);
  ctx.restore();

  // 8. EXPORT BLOB & DATA URL
  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error('Canvas toBlob failed'));
    }, 'image/png');
  });

  return { blob, dataUrl };
}

/**
 * Triggers native Instagram Story share or provides graceful Web/PWA download fallback
 */
export async function shareStoryToInstagram(
  options: StoryCardOptions
): Promise<'shared' | 'downloaded'> {
  const { blob, dataUrl } = await generateStoryCardBlob(options);

  // 1. Android APK Native Bridge Protocol (1-Click direct Instagram Story Intent)
  if (
    typeof window !== 'undefined' &&
    typeof (window as any).VybZNative?.shareToInstagramStory === 'function'
  ) {
    try {
      (window as any).VybZNative.shareToInstagramStory(
        dataUrl,
        '#0d131f',
        '#070a10',
        options.shareUrl || 'https://vybzmusic.online'
      );
      return 'shared';
    } catch (err) {
      console.warn('[storyShare] Native intent failed, falling back:', err);
    }
  }

  // 2. Modern Mobile Browser Web Share API (Android & iOS)
  if (typeof navigator !== 'undefined' && navigator.canShare) {
    const file = new File([blob], 'vybz-story.png', { type: 'image/png' });
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `${options.title} – VybZ Music`,
          text: `Listening to "${options.title}" ad-free on VybZ Music 🎶`,
          url: options.shareUrl || 'https://vybzmusic.online',
        });
        return 'shared';
      } catch {
        // User cancelled share sheet
      }
    }
  }

  // 3. Fallback: Instant Image Download for Desktop or Unsupported Browsers
  if (typeof document !== 'undefined') {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `vybz-${options.title.replace(/[^a-zA-Z0-9]/g, '_')}-story.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return 'downloaded';
}
