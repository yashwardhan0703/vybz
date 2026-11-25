import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_aesthetic_versions():
    logo_path = 'public/logo.png'
    if not os.path.exists(logo_path):
        print("logo.png not found")
        return

    orig_logo = Image.open(logo_path).convert('RGBA')
    width, height = 1200, 630

    # Fonts
    font_paths = [
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf"
    ]
    font_title = None
    for p in font_paths:
        if os.path.exists(p):
            try:
                font_title = ImageFont.truetype(p, 64)
                font_sub = ImageFont.truetype(p, 27)
                font_tag = ImageFont.truetype(p, 21)
                font_badge = ImageFont.truetype(p, 18)
                font_pill = ImageFont.truetype(p, 19)
                font_footer = ImageFont.truetype(p, 23)
                break
            except Exception:
                continue

    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_tag = ImageFont.load_default()
        font_badge = ImageFont.load_default()
        font_pill = ImageFont.load_default()
        font_footer = ImageFont.load_default()

    art_dir = "C:/Users/HP/.gemini/antigravity/brain/c6d727f8-5689-4512-99b6-9df1fa4c7d3d"
    os.makedirs(art_dir, exist_ok=True)

    # =========================================================================
    # AESTHETIC VIBE 1: WARM VINYL & AMBER AURORA (Desi Ambient Aesthetic)
    # =========================================================================
    card1 = Image.new('RGBA', (width, height), (7, 9, 15, 255))

    # 1. Multi-layered organic aurora background
    aurora = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    a_draw = ImageDraw.Draw(aurora)
    # Deep warm amber behind logo
    a_draw.ellipse([50, 60, 550, 560], fill=(245, 158, 11, 70))
    # Soft rose/magenta aura behind logo center
    a_draw.ellipse([150, 150, 450, 480], fill=(225, 29, 72, 50))
    # Purple/indigo ambient light top right
    a_draw.ellipse([650, 30, 1150, 400], fill=(139, 92, 246, 30))
    # Warm golden wash bottom right
    a_draw.ellipse([750, 350, 1250, 650], fill=(245, 158, 11, 25))
    aurora = aurora.filter(ImageFilter.GaussianBlur(95))
    card1 = Image.alpha_composite(card1, aurora)

    # 2. Vinyl & Sound Wave Grooves behind Logo (Aesthetic Halo)
    vinyl_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vinyl_layer)
    cx, cy = 280, 315
    # Concentric glowing vinyl sound rings
    radii = [185, 205, 225, 245, 265]
    for i, r in enumerate(radii):
        alpha = int(45 - i * 7)
        v_draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(253, 224, 71, alpha), width=1)
    
    # Subtle musical soundwave equalizer bars under logo
    bar_x = 180
    bar_y_base = 525
    bar_heights = [12, 22, 38, 55, 32, 48, 62, 40, 25, 14, 28, 45, 20, 10]
    for bh in bar_heights:
        v_draw.rounded_rectangle([bar_x, bar_y_base - bh, bar_x + 5, bar_y_base], radius=2, fill=(245, 158, 11, 140))
        bar_x += 15

    card1 = Image.alpha_composite(card1, vinyl_layer)

    # 3. Paste Logo with soft back-shadow for 3D depth
    logo_size = 400
    scaled_logo = orig_logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    card1.paste(scaled_logo, (int(cx - logo_size / 2), int(cy - logo_size / 2)), scaled_logo)

    # 4. Right side typography
    draw1 = ImageDraw.Draw(card1)
    rx = 540

    # Top Badge: Luxury Solid Gold Pill with dark typography
    badge_text = "✦   OFFICIAL AD-FREE MUSIC PLATFORM   ✦"
    b_box = draw1.textbbox((0, 0), badge_text, font=font_badge)
    bw = b_box[2] - b_box[0] + 36
    bh = 38
    by = 92
    draw1.rounded_rectangle([rx, by, rx + bw, by + bh], radius=19, fill=(245, 158, 11, 245), outline=(253, 224, 71, 255), width=1)
    bx_text = rx + (bw - (b_box[2] - b_box[0])) / 2
    by_text = by + (bh - (b_box[3] - b_box[1])) / 2 - 2
    draw1.text((bx_text, by_text), badge_text, font=font_badge, fill=(11, 15, 24))

    # Main Title with glowing gold subtitle
    draw1.text((rx, 152), "VybZ Music", font=font_title, fill=(255, 255, 255))
    draw1.text((rx, 242), "100% Ad-Free Indian Music Streaming", font=font_sub, fill=(245, 158, 11))
    draw1.text((rx, 292), "Chai Tapri, Sufi, Dhaba & 10 Ambient Stations", font=font_tag, fill=(195, 210, 230))

    # Feature Pills: Deep glass with glowing amber outline
    features = ["Zero Audio Ads", "Background Audio", "Daily Top 25"]
    fx = rx
    fy = 352
    pill_h = 44
    for feat in features:
        fbox = draw1.textbbox((0, 0), feat, font=font_pill)
        fw = fbox[2] - fbox[0] + 34
        draw1.rounded_rectangle([fx, fy, fx + fw, fy + pill_h], radius=22, fill=(17, 23, 36, 255), outline=(245, 158, 11, 140), width=1)
        tx = fx + (fw - (fbox[2] - fbox[0])) / 2
        ty = fy + (pill_h - (fbox[3] - fbox[1])) / 2 - 2
        draw1.text((tx, ty), feat, font=font_pill, fill=(253, 224, 71))
        fx += fw + 16

    # Aesthetic Divider with star accent
    draw1.line([rx, 442, rx + 580, 442], fill=(255, 255, 255, 35), width=1)
    draw1.text((rx, 470), "vybzmusic.online   •   Android APK Available", font=font_footer, fill=(252, 211, 77))

    # Outer luxury card border
    draw1.rounded_rectangle([15, 15, width - 15, height - 15], radius=28, outline=(245, 158, 11, 50), width=1)

    p1 = os.path.join(art_dir, "aesthetic_vibe_1.jpg")
    card1.convert('RGB').save(p1, quality=92)
    print("Saved Aesthetic Vibe 1 to", p1)

    # =========================================================================
    # AESTHETIC VIBE 2: NEON LO-FI NIGHT (Glass Card & Golden Halo)
    # =========================================================================
    card2 = Image.new('RGBA', (width, height), (6, 8, 14, 255))
    
    # Circular Halo Glow directly hugging the VybZ logo
    halo = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(halo)
    # Bright inner core glow
    h_draw.ellipse([cx - 160, cy - 160, cx + 160, cy + 160], fill=(245, 158, 11, 95))
    # Soft outer feather
    h_draw.ellipse([cx - 260, cy - 260, cx + 260, cy + 260], fill=(217, 70, 239, 45))
    halo = halo.filter(ImageFilter.GaussianBlur(65))
    card2 = Image.alpha_composite(card2, halo)

    # Floating aesthetic glass tile behind logo
    glass = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glass)
    g_draw.rounded_rectangle([cx - 210, cy - 210, cx + 210, cy + 210], radius=40, fill=(255, 255, 255, 8), outline=(245, 158, 11, 60), width=1)
    card2 = Image.alpha_composite(card2, glass)

    # Paste Logo
    card2.paste(scaled_logo, (int(cx - logo_size / 2), int(cy - logo_size / 2)), scaled_logo)

    # Right side typography for Vibe 2
    draw2 = ImageDraw.Draw(card2)
    # Dark Glass Badge with bright white text
    draw2.rounded_rectangle([rx, by, rx + bw, by + bh], radius=19, fill=(18, 24, 38, 255), outline=(245, 158, 11, 200), width=2)
    draw2.text((bx_text, by_text), badge_text, font=font_badge, fill=(255, 255, 255))

    draw2.text((rx, 152), "VybZ Music", font=font_title, fill=(255, 255, 255))
    draw2.text((rx, 242), "100% Ad-Free Indian Music Streaming", font=font_sub, fill=(245, 158, 11))
    draw2.text((rx, 292), "Chai Tapri, Sufi, Dhaba & 10 Ambient Stations", font=font_tag, fill=(195, 210, 230))

    # Feature pills
    fx = rx
    for feat in features:
        fbox = draw2.textbbox((0, 0), feat, font=font_pill)
        fw = fbox[2] - fbox[0] + 34
        draw2.rounded_rectangle([fx, fy, fx + fw, fy + pill_h], radius=22, fill=(17, 23, 36, 255), outline=(245, 158, 11, 140), width=1)
        tx = fx + (fw - (fbox[2] - fbox[0])) / 2
        ty = fy + (pill_h - (fbox[3] - fbox[1])) / 2 - 2
        draw2.text((tx, ty), feat, font=font_pill, fill=(253, 224, 71))
        fx += fw + 16

    draw2.line([rx, 442, rx + 580, 442], fill=(255, 255, 255, 35), width=1)
    draw2.text((rx, 470), "vybzmusic.online   •   Android APK Available", font=font_footer, fill=(252, 211, 77))

    # Outer border
    draw2.rounded_rectangle([15, 15, width - 15, height - 15], radius=28, outline=(245, 158, 11, 50), width=1)

    p2 = os.path.join(art_dir, "aesthetic_vibe_2.jpg")
    card2.convert('RGB').save(p2, quality=92)
    print("Saved Aesthetic Vibe 2 to", p2)

if __name__ == '__main__':
    create_aesthetic_versions()
