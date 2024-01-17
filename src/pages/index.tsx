import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/').createRoute({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}
