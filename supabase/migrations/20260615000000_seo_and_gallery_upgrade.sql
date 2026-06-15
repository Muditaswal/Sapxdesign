-- Migration: SEO and Gallery Upgrades for Project Images
-- Added: is_cover, is_featured_homepage, image_order

ALTER TABLE project_images ADD COLUMN IF NOT EXISTS image_order INTEGER DEFAULT 0;
ALTER TABLE project_images ADD COLUMN IF NOT EXISTS is_cover BOOLEAN DEFAULT FALSE;
ALTER TABLE project_images ADD COLUMN IF NOT EXISTS is_featured_homepage BOOLEAN DEFAULT FALSE;

-- Sync existing cover images (marked as 'hero' image_type) to is_cover = true
UPDATE project_images SET is_cover = TRUE WHERE image_type = 'hero';
