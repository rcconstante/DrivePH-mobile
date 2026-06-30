@AGENTS.md
# CLAUDE.md

You are a senior full-stack developer working on **DrivePH**, a mobile driving guide app.

## Main Goal

Build a clean, production-ready **Expo React Native + TypeScript** app that matches the provided UI reference closely.

The app should feel:
- modern
- clean
- beginner-friendly
- polished
- mobile-first
- consistent with the reference image

## Tech Stack

Use:
- Expo
- React Native
- TypeScript
- Expo Router
- Zustand or Context when needed
- AsyncStorage for local progress/saved items
- Reusable components
- Feature-based folder structure

## Important Rules

Do **not** put everything inside one file.

Break code into:
- screens
- components
- hooks
- services
- types
- constants
- data files
- theme files

Follow industry standards and clean code practices.

Avoid:
- duplicate code
- hardcoded repeated styles
- messy inline logic
- large unreadable files
- unused components
- incomplete navigation
- fake broken imports
- inconsistent spacing/colors

## UI Design Requirements

The design must match the reference image style:

- white/light background
- blue primary color
- red accent for PH branding
- rounded cards
- soft shadows
- clean icons
- large readable headings
- simple bottom navigation
- mobile-safe spacing
- modern onboarding screens
- clean quiz cards
- road sign list cards
- emergency and scenario cards

Use a shared theme file for:
- colors
- spacing
- typography
- border radius
- shadows

## Required App Flow

```text
Splash
→ Onboarding
→ Choose Vehicle
→ Choose License Type
→ Home