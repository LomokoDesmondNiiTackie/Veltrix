import AddBoard from "@/components/boards/addBoard";
import Board from "@/components/boards/board";
import SearchFav from "@/components/boards/searchFav";

export default function BoardsPage() {
  return (
    <section className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="h-full w-full relative flex flex-col bg-white rounded-2xl shadow-card border border-neutral-gray/20 p-6 sm:p-4">
        <div className="con h-[10%] w-full flex justify-between ">
          <SearchFav />
          <AddBoard />
        </div>
        <div className="boardsContainer h-[90%] w-full overflow-hidden">
          <Board/>
        </div>
      </div>
    </section>
  );
}
