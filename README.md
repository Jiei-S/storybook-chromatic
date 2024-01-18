# VRT & Interaction Test with Chromatic/Storybook

This is a sample project for VRT & Interaction Test with Chromatic/Storybook.  
Automatically run Chromatic's automation whenever you open a pull request.  

For more information, see [Qiita](https://qiita.com/Jiei-S/items/14a0f8d42e1f5c872ab7)

# How To Run Storybook

```bash
$ yarn storybook
```

Storybook will be started on `http://localhost:6006`.


# How To Write Story

1. Create story file with `*.stories.tsx` and write a story for component catalog.

   - Story structure and hierarchy must be the same as the actual application.  
     e.g. `components/typography/h1.tsx` -> `Components/Typography/H1`
   - If possible, write a story that closely matches the actual application. Because, also use it as a UI component catalog.  
     e.g. Event Handler, Page Transition, State Management, etc...

2. Create story file with `Test.stories.tsx` and write a story with play function for interaction test.

   - Interactions and test scenarios must be written in page stories.  
   - Story structure and hierarchy must be the same as the story for component catalog. And, add `__Test__` to the end.  
     e.g. `Pages/Projects/__Test__`
   - Recommended to separete story for each user scenario. Because, it is complicated to simulate the user's behavior in a single story.

3. Run storybook and check the story.


