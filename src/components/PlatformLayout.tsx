import { CardProjects } from './CardProjects';

export const PlatformLayout = (): JSX.Element => {
  return (
    <div className=" justify-center p-10 flex gap-6">
      <section className="flex flex-col bg-zinc-800 p-5 rounded-s-xl">
        <h1 className="text-3xl  text-white">PROJECTS</h1>
        <CardProjects />
      </section>
      <section className="flex-1 max-w-sm bg-zinc-800 p-5 rounded-e-xl">
        <h1 className="text-3xl text-white">REPORTS</h1>
        {/* Contenido de las tareas aquí */}
      </section>
    </div>
  );
};
