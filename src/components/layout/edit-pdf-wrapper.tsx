import { ReactNode } from 'react';
import Spinner from '../common/spinner';
import { Toaster } from 'react-hot-toast';

interface IProps {
  workspace: ReactNode;
  toolSidebar: ReactNode;
  isLoading: boolean;
}

export default function EditPdfWrapper({
  workspace,
  toolSidebar,
  isLoading,
}: IProps) {
  return (
    <>
      <Toaster position="bottom-left"></Toaster>
      {/* {!isFilesLoaded && !isLoading && (
        <div className="flex flex-col gap-7.5 items-center  pt-32.5 px-7.5 h-full overflow-y-auto overflow-x-hidden">
          {welcomeScreen}
        </div>
      )} */}
      {isLoading && (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner size="md"></Spinner>
        </div>
      )}
      {!isLoading && (
        <div className="flex h-full justify-between  relative">
          <div
            className="flex flex-wrap p-22.5 gap-3.75 justify-center items-center overflow-y-auto overflow-x-hidden w-full"
            style={{
              transition: 'all .3s',
            }}
          >
            {workspace}
          </div>
          {toolSidebar}
        </div>
      )}
    </>
  );
}
