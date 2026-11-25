import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_options():
    logo_path = 'public/logo.png'
    if not os.path.exists(logo_path):
        print("logo.png not found")
        return

    orig_logo = Image.open(logo_path).convert('RGBA')
    width, height = 1200, 630

    # Fonts setup
    font_title = None
    font_sub = None
    font_tag = None
    font_badge = None
    font_bold_hook = None
    font_paths = [
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                font_title = ImageFont.truetype(p, 66)
                font_sub = ImageFont.truetype(p, 30)
                font_tag = ImageFont.truetype(p, 23)
                font_badge = ImageFont.truetype(p, 20)
                font_bold_hook = ImageFont.truetype(p, 25)
                break
            except Exception:
                continue

    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_tag = ImageFont.load_default()
        font_badge = ImageFont.load_default()
        font_bold_hook = ImageFont.load_default()

    def get_base_card():
        card = Image.new('RGBA', (width, height), (9, 12, 19, 255))
        # Ambient radial glow
        glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        g_draw = ImageDraw.Draw(glow)
        g_draw.ellipse([70, 40, 680, 610], fill=(245, 158, 11, 40))
        g_draw.ellipse([680, 80, 1220, 610], fill=(225, 29, 72, 22))
        glow = glow.filter(ImageFilter.GaussianBlur(85))
        card = Image.alpha_composite(card, glow)
        
        # Place Logo on Left
        logo_size = 420
        scaled_logo = orig_logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        card.paste(scaled_logo, (90, int((height - logo_size) / 2)), scaled_logo)
        return card

    art_dir = "C:/Users/HP/.gemini/antigravity/brain/c6d727f8-5689-4512-99b6-9df1fa4c7d3d"
    os.makedirs(art_dir, exist_ok=True)
    rx = 560

    # -------------------------------------------------------------
    # OPTION 1: Dark Glassmorphism Pills (Visible High-Contrast Badges)
    # -------------------------------------------------------------
    card1 = get_base_card()
    draw1 = ImageDraw.Draw(card1)
    
    # Top badge
    draw1.rounded_rectangle([rx, 105, rx + 440, 145], radius=20, fill=(245, 158, 11, 35), outline=(245, 158, 11, 140), width=1)
    draw1.text((rx + 30, 113), "+  OFFICIAL INDIAN MUSIC PLATFORM  +", font=font_badge, fill=(253, 224, 71))

    # Title & Subtitles
    draw1.text((rx, 170), "VybZ Music", font=font_title, fill=(255, 255, 255))
    draw1.text((rx, 255), "100% Ad-Free Indian Music Streaming", font=font_sub, fill=(245, 158, 11))
    draw1.text((rx, 305), "Chai Tapri, Sufi, Dhaba & 10 Ambient Stations", font=font_tag, fill=(200, 215, 235))

    # High Contrast Dark Glass Pills
    features1 = ["Zero Audio Ads", "Background Audio", "Daily Top 25"]
    fx = rx
    fy = 365
    for feat in features1:
        bbox = draw1.textbbox((0, 0), feat, font=font_badge)
        fw = bbox[2] - bbox[0] + 36
        draw1.rounded_rectangle([fx, fy, fx + fw, fy + 44], radius=22, fill=(22, 28, 42, 255), outline=(245, 158, 11, 120), width=1)
        draw1.text((fx + 18, fy + 10), feat, font=font_badge, fill=(253, 224, 71))
        fx += fw + 16

    # Footer
    draw1.line([rx, 455, rx + 560, 455], fill=(255, 255, 255, 35), width=1)
    draw1.text((rx, 480), "vybzmusic.online   *   Android APK Available", font=font_sub, fill=(252, 211, 77))

    p1 = os.path.join(art_dir, "option1_dark_pills.jpg")
    card1.convert('RGB').save(p1, quality=90)
    print("Saved Option 1 to", p1)

    # -------------------------------------------------------------
    # OPTION 2: Single Bold Hook Strip (Maximum Virality & Impact)
    # -------------------------------------------------------------
    card2 = get_base_card()
    draw2 = ImageDraw.Draw(card2)

    # Top badge
    draw2.rounded_rectangle([rx, 105, rx + 440, 145], radius=20, fill=(245, 158, 11, 35), outline=(245, 158, 11, 140), width=1)
    draw2.text((rx + 30, 113), "+  OFFICIAL INDIAN MUSIC PLATFORM  +", font=font_badge, fill=(253, 224, 71))

    # Title & Subtitles
    draw2.text((rx, 170), "VybZ Music", font=font_title, fill=(255, 255, 255))
    draw2.text((rx, 255), "100% Ad-Free Indian Music Streaming", font=font_sub, fill=(245, 158, 11))
    draw2.text((rx, 305), "Chai Tapri, Sufi, Dhaba & 10 Ambient Stations", font=font_tag, fill=(200, 215, 235))

    # Single Bold Hook Ribbon
    hook_text = "ZERO ADS   *   NO LOGIN   *   SCREEN LOCK AUDIO"
    draw2.rounded_rectangle([rx, 360, rx + 560, 415], radius=16, fill=(245, 158, 11, 35), outline=(245, 158, 11, 180), width=2)
    draw2.text((rx + 25, 373), hook_text, font=font_bold_hook, fill=(253, 224, 71))

    # Footer
    draw2.line([rx, 455, rx + 560, 455], fill=(255, 255, 255, 35), width=1)
    draw2.text((rx, 480), "vybzmusic.online   *   Android APK Available", font=font_sub, fill=(252, 211, 77))

    p2 = os.path.join(art_dir, "option2_bold_hook.jpg")
    card2.convert('RGB').save(p2, quality=90)
    print("Saved Option 2 to", p2)

    # -------------------------------------------------------------
    # OPTION 3: Ultra Minimal Luxury (No Boxes at all)
    # -------------------------------------------------------------
    card3 = get_base_card()
    draw3 = ImageDraw.Draw(card3)

    # Top category
    draw3.text((rx, 115), "DESI AMBIENT & RETRO STREAMING", font=font_badge, fill=(245, 158, 11))

    # Title & Subtitles with spacious luxury typography
    draw3.text((rx, 160), "VybZ Music", font=font_title, fill=(255, 255, 255))
    draw3.text((rx, 250), "100% Ad-Free Indian Music Player", font=font_sub, fill=(245, 158, 11))
    draw3.text((rx, 305), "Chai Tapri  *  Sufi Sukoon  *  Hostel Ki Raat  *  Lo-Fi Hits", font=font_tag, fill=(200, 215, 235))
    draw3.text((rx, 355), "Stream online or download the Android Background Audio App.", font=font_tag, fill=(160, 175, 200))

    # Footer
    draw3.line([rx, 445, rx + 560, 445], fill=(255, 255, 255, 35), width=1)
    draw3.text((rx, 475), "vybzmusic.online   *   Android APK Available", font=font_sub, fill=(252, 211, 77))

    p3 = os.path.join(art_dir, "option3_ultra_minimal.jpg")
    card3.convert('RGB').save(p3, quality=90)
    print("Saved Option 3 to", p3)

if __name__ == '__main__':
    create_options()
