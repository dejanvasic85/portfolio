- [x] Improve the content for all the projects in the projects.md file
- [x] Research and come up with a new design for the projects page
- [x] Redesign the projects page using the new content structure for projects
- [ ] Create a section on the homepage for "Work with me" that better highlights current projects and includes a call-to-action button to contact me

## Contact Form Implementation Plan

### Placement Strategy
- [ ] Add "Contact me" section on homepage with brief contact form
- [ ] Create dedicated contact page (`/contact`) with full form
- [ ] Add "Contact" link to main navigation

### Technical Implementation
- [ ] Create API route `src/pages/api/contact.ts` for form submission
- [ ] Integrate AWS SES for email sending (confirmation + notification)
- [ ] Implement client-side and server-side validation
- [ ] Add progressive enhancement (works without JS)

### Form Fields
**Essential:**
- [ ] Name (required)
- [ ] Email (required)
- [ ] Project type dropdown (Web Development, Consulting, Long-term Contract, etc.)
- [ ] Message/Project description (required)

**Optional:**
- [ ] Company name
- [ ] Budget range dropdown
- [ ] Timeline dropdown
- [ ] Preferred contact method

### Security & UX
- [ ] Start without CAPTCHA (monitor for spam)
- [ ] Implement basic rate limiting in API route
- [ ] Add success/error states with proper UI feedback
- [ ] Style consistent with existing site design

### Future Enhancements
- [ ] Add CAPTCHA if spam becomes an issue
- [ ] Consider storing submissions in lightweight database
- [ ] Add analytics tracking for form submissions
