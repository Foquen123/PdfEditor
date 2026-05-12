import Spinner from '@/components/common/spinner';

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner size='lg'></Spinner> 
    </div>
  );
}
