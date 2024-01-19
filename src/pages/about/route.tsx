import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/about').createRoute({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <h3>About</h3>
    </main>
  );
}
