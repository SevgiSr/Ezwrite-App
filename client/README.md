# Replaced usage of useEffect and useContext for server state with React Query

- Use React Query when requesting data from the server and updating UI with it. Because it implements caching, refetching etc for you.

- Use react context and useEffect when dealing with client state - like edit mode, opening modal, changing theme. Those are not requested from the server.

- State management libraries like Redux or even useContext itself are not good for working with asynchronous state (server state)

Client state = synchronous
Server state = asynchronous (fetching APIs)

# The correct approach with backend controllers - Don't Break Down, Collect!

- We had profile page of a user. The page had conversations,following,activity tabs.

- Each time we clicked the tabs it made API request to get values. Tabs were blank until server responded. It looked irresponsive.

- Instead of having separate controllers for getting activity or followings you should have one controller to get ALL of them at once. Because they're tied to profile object anyways. make API request when profile page first mounts.

- It's a very bad idea to make components do API requests when they're a small part of the big page.

# !!IMPORTANT: Realized that when you delete an object in MongoDB, you have to manually delete all of it's references or child objects.

-If I delete story I have to manually delete all of it's chapters. And paragraphs of those chapters etc.

-If I delete story I have to delete all of it's reference id's. Pull it from the user object or readingList object.

# !!IMPORTANT: Don't use {upsert: true} in mongoose. (it creates new documents if the document was not found)

# RQ Notes

## Controller has to return json

If you want you useMutation to work, backend function has to respond with json

# General notes

## Learned population method for mongoose

const chapter = await Chapter.findById(chapter_id)
.populate({
path: "comments",
populate: [
{ path: "author", model: "User" },
{ path: "subcomments", populate: { path: "author", model: "User" } },
],
})
.populate({
path: "paragraphs",
populate: {
path: "comments",
populate: [
{ path: "author", model: "User" },
{ path: "subcomments", populate: { path: "author", model: "User" } },
] ,
},
});
