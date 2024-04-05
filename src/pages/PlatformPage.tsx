import { Navbar } from '../components/Navbar';
import { PlatformLayout } from '../components/PlatformLayout';

const PlatformPage = (): JSX.Element => {
  return (
    <>
      <div>
        <Navbar />
        <PlatformLayout />
      </div>
    </>
  );
};

export default PlatformPage;
