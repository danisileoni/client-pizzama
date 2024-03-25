import { CardProjects } from './CardProjects';
import { CardReports } from './CardReports';

export const PlatformLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row container p-10 gap-6">
      <section className="flex flex-col container bg-zinc-800 p-5 rounded-s-xl">
        <h1 className="text-3xl  text-white">PROJECTS</h1>
        <CardProjects />
      </section>
      <section className="flex flex-col max-w-sm bg-zinc-800 container p-5 rounded-e-xl">
        <h1 className="text-3xl text-white mb-2">REPORTS</h1>
        <CardReports />
      </section>
    </div>
  );
};
