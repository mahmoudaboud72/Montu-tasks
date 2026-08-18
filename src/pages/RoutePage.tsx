type Props = {
  title: string;
  description: string;
};

export default function RoutePage({ title, description }: Props) {
  return (
    <section className="p-6 md:p-8">
      <p className="font-mono text-xs uppercase text-accent">Route content</p>
      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
