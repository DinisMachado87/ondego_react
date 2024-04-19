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

### Authentication

#### As a user, I can sign up, sign in, and maintain my logged-in status so that I can access the app's features seamlessly.

- **AC1:** Users can sign up for a new account.
- **AC2:** Users can sign in to the app.
- **AC3:** Users can stay logged in until they choose to log out explicitly.
- **AC4:** Access tokens are refreshed automatically to maintain the logged-in status.

### Creating and Updating Events

#### As a user, I can create events and be able to edit their details so that I can share and manage spontaneous plans with others.

- **AC1:** Users can create new events with relevant details such as title, date, time, location, and description.
- **AC2:** Event creators can edit event details like title, date, time, location, and description after creation.

### Joining Events

#### As a user, I can join and leave events to indicate my participation and manage my plans effectively.

- **AC1:** Users can join events to indicate their participation.
- **AC2:** Users can leave events if their plans change.

### Viewing Other Profiles

#### As a user, I can view other users' profiles and follow/unfollow them to stay connected and discover interesting events.

- **AC1:** Users can view other users' profiles details.
- **AC2:** Users can follow or unfollow other users to customize their event feed.

### Viewing Event List

#### As a user, I can see a list of recent events and be able to search for specific events by keywords.

- **AC1:** Users can view a list of most recent events.
- **AC2:** Users can search for events using keywords to find events of interest.

### Viewing Event Detail Page

#### As a user, I can view detailed information about an event and be able to interact with it by joining and commenting.

- **AC1:** Users can view detailed information about an event, including its title, date, time, location, description, and creator.
- **AC2:** Users can join an event to indicate their participation.
- **AC3:** Users can add comments to an event to share thoughts or ask questions.

### Viewing Profile Detail Page

#### As a user, I can view detailed information about a user's profile, including their 'would like to' and 'feeling...' fields, to understand their social expectations and intentions better.

- **AC1:** Users can view detailed information about a user's profile, including their 'would like to' and 'feeling...' fields.
- **AC2:** Users can understand the social expectations and intentions of other users through their profile details.

### Communicating Intentions and Expectations

#### As a user, I can communicate my intentions and expectations for an event through profile fields like 'would like to' and 'feeling ...' and event field 'intention' to enhance social consent and understanding.

- **AC1:** Users can set their intentions and expectations for an event through profile fields like 'would like to' and 'feeling ...'.
- **AC2:** Users can view other users' intentions and expectations for an event through profile details and event information.



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

### Event Creation with Default Date and Time

In the development of the EventCreateForm component, I prioritized user experience by prepopulating the start and end times of an event with default values. This feature is particularly beneficial for users creating spontaneous events, a key focus of this application.

I set the start time (when_start) to default to today's date at 18:00 (6 PM), and the end time (when_end) to default to today's date at 23:00 (11 PM). These times were chosen as they typically represent after-work hours when most spontaneous events are likely to occur.

To achieve this, I created the getTodayAt function, which takes hours and minutes as parameters and returns a string representing the current date at the specified time.

    const getTodayAt = (hours, minutes) => {
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.toISOString().slice(0, 16);
    }

By prepopulating these fields, I've reduced the number of clicks and typing required by the user, making the event creation process quicker and more efficient. Even if users need to adjust the hours, they likely won't need to change the minutes or date, further enhancing their experience.

## Deployment

## Manual Testing

## Resolved bugs

### Debugging the Add Event Image Upload Button

Initially, the Add Event Image Upload Button was not functioning as expected. The standard button appeared grey inside the customized orange button, which was not the desired behavior. The issue was that the browser's default file input button was not being styled correctly.

To resolve this issue, I implemented a common workaround for styling file inputs. I hid the actual file input and used a label to create a custom button. The label was associated with the file input using the `htmlFor` attribute, so clicking the label triggered the file input. This made the entire label, including the `Asset` component and the custom button text, act like a file upload button.

However, this initially resulted in two buttons being displayed due to the ternary operation in the code. To fix this, I used a second ternary operation to change the text of the same button, instead of having two separate buttons. This ensured that only one button was displayed at a time, with the text changing based on whether an image had been uploaded.

With these changes, the image upload button is now working as expected, with the correct styling and behavior.

### Debugging the Image Display in the add event

While working on the Create Event module, I encountered an issue where the image wasn't staying within its container. Initially, I thought the problem was with the CSS properties `max-width` and `max-height` that I had used. I tried setting defined heights and widths for the image and its parent containers, but this didn't solve the issue.

After investigating further, I realized that the problem wasn't with the CSS properties or with Bootstrap overwriting my custom CSS. The issue was that I was addressing the wrong element. The placeholder image was sourced from the assets module, not from the image tag. So, I needed to apply the sizing CSS code to both the image and the asset to get the same result with the placeholder and the image uploaded by the users.

After making this change, the image started responding as expected. However, there was still some work to be done. I noticed that the positioning style in the two levels of parents wasn't mirrored. So, I made sure to mirror the positioning style in the two levels of parents to ensure the image was displayed correctly within its container.

In conclusion, the image display issue in the Create Event module was resolved by addressing the correct element in the CSS and mirroring the positioning style in the two levels of parents. This served as a reminder that sometimes the issue isn't with the code you're focusing on, but somewhere often so evident it is hard to see!

### Debugging the EventCreateForm Component

The EventCreateForm component did not submit the placeholder image when no image was selected by the user. This was due to the `event_Image` state being set to `null` by default, which caused the placeholder image to be removed when the form was submitted without an image. To resolve this issue, I updated the `event_image` state to default to the placeholder image when no image was selected. This ensured that the placeholder image was submitted with the form when no image was selected by the user.

### Debugging Image Upload in EventCreateForm

I encountered still another issue with the image upload functionality. The problem was that when a user did not upload an image for an event, we wanted to send a default placeholder image to the server. However, the server was expecting an image file, not a URL. To resolve this issue, I updated the `event_image` state to store the image file when a user uploaded an image and the placeholder image URL when no image was uploaded. This allowed the form to submit the correct data to the server, ensuring that the placeholder image was displayed when no image was uploaded by the user. This resolved the issue and ensured that the image upload functionality worked as expected. 

The original code was:

    if (imageInput.current.files[0]) {
        formData.append('event_image', imageInput.current.files[0]);
    }

This code was checking if the user selected an image file. If they had not, it appended the file to the formData object. If they had not, it did nothing. This was causing an error because the server was expecting a file for the 'event_image' field.

To fix this, I researched a way to modify the code to fetch the placeholder image, convert it to a Blob, create a File object from the Blob, and append it to the formData object when the user does not upload an image. The updated code is:

    if (imageInput.current.files[0]) {
        formData.append('event_image', imageInput.current.files[0]);
    } else {
        const response = await fetch(Upload);
        const blob = await response.blob();
        const file = new File([blob], 'upload.jpg', { type: 'image/jpeg' });
        formData.append('event_image', file);
    }

In this updated code, Upload is the URL of the placeholder image and 'upload.jpg' is the filename.

This solution ensures that a file is always sent for the 'event_image' field, whether it's the user-uploaded image or the default placeholder image.

### Debugging and developing the Choices functionality

I adapted the "like" functionality from the CI react walkthrough. I transformed this model from a boolean into a 3 choices model of "I'm going", "I'm not going", and "I'm considering it". I renamed the model from "Like" to "Joining" to better reflect its new purpose.

To achieve this, I replaced the boolean "like" field with a "choice" field that could take three different values. I also renamed the model from "Like" to "Joining" to better reflect its new purpose.

The first challenge was updating the counts of each choice when a user changed their mind. Initially, I tried to handle this on the client side, but I quickly realized that it would lead to inconsistencies. I moved this logic to the server side, Updating and annotating the count of each choice when a user changed their mind.


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

- In Lighthouse
- in the Code Institute CI Python Linter
- In W3C HTML
- In W3C CSS
