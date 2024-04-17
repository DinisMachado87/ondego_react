![Presentation image](path/path)

# öndëgö | README

## Overview

## Features

### 1. 

## Design

### Establishing **Öndëgö**'s Visual Identity

As Öndëgö took shape, I envisioned a design that harmonized playfulness with sobriety, evoking a sense of intrigue and vibrancy. The app's interface features backgrounds in variations of black and very dark grey, lending an eerie yet captivating ambiance. Against this backdrop, fonts in secondary vibrant colors — orange, purple, and green — punctuate the darkness with neon vibes, striking a balance between whimsy and sophistication.

### Logo

In the journey of shaping Öndëgö's visual identity and its logo, I turned to the playful and quirky Platypi font from Google Fonts. With the help of the Google Fonts to SVG Path online tool, I transformed the text outline into a vector graphic (SVG) to give Öndëgö its unique mark.

The process began with selecting Platypi, a playful and quirky Google Font, to reflect Öndëgö's essence. I crafted the outline of the app's name using the Platypi font. The rounded shapes and whimsical charm of Platypi perfectly encapsulated the spirit of Öndëgö, setting the foundation for its visual identity.

To transform the Platypi text into a scalable vector graphic (SVG), I turned to [Google Font to SVG Path](https://danmarshall.github.io/google-font-to-svg-path/), a tool capable of converting text to SVG paths. I then captured the SVG vectors as a design feature.

Next, using [Canva](https://www.canva.com/), I converted the file to a PNG with a transparent background.

Overall, your version effectively communicates your process. These suggestions are merely to enhance clarity and readability. Great work!

### Font Selection

Öndëgö's font selection embodies a delicate balance between friendliness and authenticity, without straying into gimmickry. Each font choice contributes to the project's visual identity by infusing warmth and approachability into the design, while also maintaining a sense of genuine connection. Through Platypi, Mukta, and Padauk, Öndëgö aims to create an inviting and inclusive atmosphere where spontaneity thrives, fostering meaningful interactions among friends without resorting to artificiality or clichés.

## Primary Font: Platypi

**Platypi** was carefully chosen as the primary font for Öndëgö's branding and logo. Its playful and quirky appearance perfectly embodies the project's relaxed and informal vibe, injecting personality without veering into formality. With rounded shapes and a whimsical charm, Platypi sets the tone for Öndëgö's unique identity as a platform for spontaneous hangout activities among friends.

## Secondary Font: Mukta

**Mukta** serves as the secondary font, utilized for titles and navigation elements across Öndëgö. Balancing casualness with clarity, Mukta adds depth to the visual hierarchy while maintaining coherence with Platypi's playful demeanor. Its versatility complements the project's laid-back aesthetic, ensuring a cohesive and enjoyable user experience.

## Tertiary Font: Padauk

For body text and content, **Padauk** was selected as the tertiary font. Its light and airy design prioritizes readability and simplicity, allowing the focus to remain on the content while providing a comfortable reading experience. Padauk seamlessly integrates with the playful energy of Platypi and the relaxed tone of Mukta, completing Öndëgö's font palette.


## How to Use

### 1. 

## Development User Stories

## Languages:

## Frameworks and Libraries

- **[React](https://reactjs.org/)**: React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and build complex user interfaces efficiently.

## Additional Dependencies

- **[React-Bootstrap](https://react-bootstrap.github.io/)**: React-Bootstrap is a front-end framework that provides pre-built components and styles for React applications. It allows developers to create responsive and mobile-friendly web interfaces with ease.

- **[Axios](https://axios-http.com/)**: Axios is a promise-based HTTP client for JavaScript that enables developers to make HTTP requests from the browser. It simplifies the process of sending asynchronous requests and handling responses.

- **[React-Router-Dom](https://reactrouter.com/web/guides/quick-start)**: React Router is a routing library for React that enables developers to create single-page applications with dynamic, client-side routing. It allows users to navigate between different pages without refreshing the browser.

### Other tools:

[VSCode:](https://code.visualstudio.com/) was used as the main tool to write and edit code.

[GitHub:](https://github.com/) was used to host the code of the website.

[Heroku:](https://id.heroku.com/login) Utilized for deployment and hosting of the web application, providing a scalable platform with integrated continuous delivery and deployment features.

[ElephantSQL: ](https://www.elephantsql.com/) Employed as the PostgreSQL database hosting service, offering a managed cloud database solution for storing and managing application data efficiently.

## Functionality

###  Functionality 1


## Deployment

## Manual Testing

## Resolved bugs

## Debugging the Add Event Image Upload Button

Initially, the Add Event Image Upload Button was not functioning as expected. The standard button appeared grey inside the customized orange button, which was not the desired behavior. The issue was that the browser's default file input button was not being styled correctly.

To resolve this issue, I implemented a common workaround for styling file inputs. I hid the actual file input and used a label to create a custom button. The label was associated with the file input using the `htmlFor` attribute, so clicking the label triggered the file input. This made the entire label, including the `Asset` component and the custom button text, act like a file upload button.

However, this initially resulted in two buttons being displayed due to the ternary operation in the code. To fix this, I used a second ternary operation to change the text of the same button, instead of having two separate buttons. This ensured that only one button was displayed at a time, with the text changing based on whether an image had been uploaded.

With these changes, the image upload button is now working as expected, with the correct styling and behavior.

## Debugging the Image Display in the add event

While working on the Create Event module, I encountered an issue where the image wasn't staying within its container. Initially, I thought the problem was with the CSS properties `max-width` and `max-height` that I had used. I tried setting defined heights and widths for the image and its parent containers, but this didn't solve the issue.

After investigating further, I realized that the problem wasn't with the CSS properties or with Bootstrap overwriting my custom CSS. The issue was that I was addressing the wrong element. The placeholder image was sourced from the assets module, not from the image tag. So, I needed to apply the sizing CSS code to both the image and the asset to get the same result with the placeholder and the image uploaded by the users.

After making this change, the image started responding as expected. However, there was still some work to be done. I noticed that the positioning style in the two levels of parents wasn't mirrored. So, I made sure to mirror the positioning style in the two levels of parents to ensure the image was displayed correctly within its container.

In conclusion, the image display issue in the Create Event module was resolved by addressing the correct element in the CSS and mirroring the positioning style in the two levels of parents. This served as a reminder that sometimes the issue isn't with the code you're focusing on, but somewhere often so evident it is hard to see!

## Debugging the EventCreateForm Component

The EventCreateForm component did not submit the placeholder image when no image was selected by the user. This was due to the `event_Image` state being set to `null` by default, which caused the placeholder image to be removed when the form was submitted without an image. To resolve this issue, I updated the `event_image` state to default to the placeholder image when no image was selected. This ensured that the placeholder image was submitted with the form when no image was selected by the user.


## Contributors

Dinis Machado

## Credits

[OpenMoji Awesome](https://github.com/gromain/openmoji-awesome?tab=readme-ov-file#openmoji-awesome-) 
Like Font-Awesome and Twemoji-amazing, but for Openmoji Emojis!

[https://openmoji.org/](https://openmoji.org/) 
All emojis were designed by OpenMoji – the open-source emoji and icon project. License: CC BY-SA 4.0

[https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/)

## Resources

[React-Bootstrap5 documentation]()

[Django Rest Framework documentation](https://www.django-rest-framework.org/)

Code Institute React and Rest Framework Walkthrough Tutorial Projects - access restricted to students

## Acknowledgments

A special thank you to the oversight and discussion insight from my Code Institute mentor Juliia Konn

## Verification

I verified all code:

* In Lighthouse
* in the Code Institute CI Python Linter
* In W3C HTML
* In W3C CSS

