import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/about').createRoute({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h3>About</h3>
    </div>
  );
}
