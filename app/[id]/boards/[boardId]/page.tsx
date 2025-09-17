import BoardNav from "@/components/boards/boardID/boardNav";
import DragAndDrop from "@/components/boards/boardID/dragAndDrop";

type Props = { params: { boardId: string } };

export default function BoardPage({ params }: Props) {
  return (
    <section className="w-full h-full flex items-center justify-center  px-4 sm:px-6 md:p-8 overflow-hidden">
      <div className="h-full w-full flex flex-col gap-5 bg-white rounded-2xl shadow-card border border-neutral-gray/20 p-6 sm:p-8">
        <div className="boardNav h-[5%]">
          <BoardNav boardId={params.boardId as string} />
        </div>
        <div className="boardIdDetails h-[20%] w-full border-b border-gray-200 p-4 space-y-4">
          {/* Description */}
          <div className="description">
            <h4 className="text-sm font-bold text-gray-700 mb-1">Description</h4>
            <p className="text-sm text-gray-600">
              This is where the board description goes. You can outline goals,
              objectives, or details for this board.
            </p>
          </div>

          {/* Priority + Status row */}
          <div className="flex items-start justify-between gap-6">
            {/* Priority */}
            <div className="priority">
              <h4 className="text-sm font-bold text-gray-700 mb-1">Priority</h4>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-red-100 text-red-700">
                High
              </span>
            </div>

            {/* Status */}
            <div className="status">
              <h4 className="text-sm font-bold text-gray-700 mb-1">Status</h4>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
                In Progress
              </span>
            </div>
          </div>
        </div>
        <div className="dragAndDropArea h-[75%] overflow-hidden">
          <DragAndDrop />
        </div>
      </div>
    </section>
  );
}
