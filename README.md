## Next13 Frontend

### Example page

- Uses layout, page and loading
- Revalidate page will refetch every 60 seconds

### Routing Example

- dynamic route
- nested routing

### Server Page Example

Fetches data from a route.
Uses a server component to render data
If component hasn't finished fetching data loading page will spin

- use Suspense to allow the rest of the page to render when there is a delay.
  ** TypeScript doesnt like server components **
  ** Data fetching should only be done with Server Pages **
  ** Fetch with useEffect and make components client components **
