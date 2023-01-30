const query = `query {
    postCollection{
      items{
            title
        slug
            postImage{
              url
            }
            postBody{
              json
            }
          }
    }
  }`;

async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getAllPostsForHome() {
  const entries = await fetchGraphQL(query);
  return entries;
}
