-- Migration: Add 'Immersive Design' check constraint support for Project Type
-- Description: Drop the old check constraint and add the new one supporting 'Immersive Design' and 'Experience Design' for backward compatibility.

ALTER TABLE projects 
DROP CONSTRAINT IF EXISTS projects_project_type_check;

ALTER TABLE projects 
ADD CONSTRAINT projects_project_type_check 
CHECK (project_type IN ('Space Design', 'Product Design', 'Brand Design', 'Immersive Design', 'Experience Design', 'Architecture', 'Interior Design', 'Branding', 'Research', 'UI/UX Design'));
