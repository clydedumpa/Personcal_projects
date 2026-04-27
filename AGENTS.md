# Kanban Project

## Business Requirements

- An MVP of my website based on my linkedin profile saved as Profile.pdf
- The web site should have 1 interactive page
- The site should have different categoriees based on the details of my profile.  
- Each category should have detailed information and enhanced graphical interface based on how Steve Jobs would want it to look like.
- A digital twin AI chat should be available that could be used using my the API key on the .env file with the model: 'OpenAI:gpt-oss-120b (free)'
- No more functionality: no archive, no search/filter. Keep it simple.
- The priority is a slick, professional, gorgeous UI/UX with very simple features


## Technical Details

- Implemented as a modern NextJS app, client rendered
- The NextJS app should be created in a subdirectory `frontend`
- No persistence
- No user management for the MVP
- Use popular libraries
- As simple as possible but with an elegant UI

## Color Scheme

- Accent Yellow: `#ecad0a` - accent lines, highlights
- Blue Primary: `#209dd7` - links, key sections
- Purple Secondary: `#753991` - submit buttons, important actions
- Dark Navy: `#032147` - main headings
- Gray Text: `#888888` - supporting text, labels

## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore, and rigorous unit testing.
2. Execute the plan ensuring all critiera are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Only complete when the MVP is finished and tested, with the server running and ready for the user

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
