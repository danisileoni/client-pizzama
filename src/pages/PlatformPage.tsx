import { Navbar } from '../components/Navbar';
import { PlatformLayout } from '../components/PlatformLayout';

export const PlatformPage = (): JSX.Element => {
  return (
    <>
      <div>
        <Navbar />
        <PlatformLayout />
      </div>
    </>
  );
};
