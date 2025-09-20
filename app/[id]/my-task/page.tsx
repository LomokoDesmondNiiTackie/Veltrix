import DragAndDrop from "@/components/my-task/dragAndDrop";

export default function MyTaskPage() {
  return (
    <section className="w-full h-full flex items-stretch justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-ful h-full rounded-2xl bg-white border-neutral-gray/20 p-4 sm:p-6 md:p-8 overflow-hidden flex flex-col">
        <div className="overflow-hidden">
          <DragAndDrop/> 
        </div>
      </div>
    </section>
  );
}
