import { Icon } from '@iconify/react/dist/iconify.js';

export default function ContainerDescripcion() {
  return (
    <footer className="text-xs pt-6 rounded-2xl p-6 flex shadow-2xl backdrop-blur-2xl text-zinc-500  border-zinc-900 bg-zinc-900/70 flex-col justify-center-safe items-center gap-2 ">
      <p className="text-pretty text-center ">
        Desarrollandose con tecnologias{' '}
      </p>
      <div className="flex gap-2">
        <button className="btn-icon">
          <Icon icon="tabler:brand-tailwind" width="24" height="24" />
        </button>

        <button className="btn-icon">
          <Icon icon="tabler:brand-react" width="24" height="24" />
        </button>

        <button className="btn-icon">
          <Icon icon="tabler:brand-typescript" width="24" height="24" />
        </button>

        <button className="btn-icon">
          <Icon icon="tabler:brand-nodejs" width="24" height="24" />
        </button>

        <button className="btn-icon">
          <Icon icon="tabler:brand-github" width="20" height="20" />
        </button>
      </div>
      <p>@CesarMartinez - KittenTools.</p>
    </footer>
  );
}
