import AddMemberToTeam from "@/components/team/addMember";
import MemberCard from "@/components/team/memberCard";


export default function TeamPage() {
  return (
    <section className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="h-full w-full bg-white rounded-2xl shadow-card border border-neutral-gray/20 p-6 sm:p-8 overflow-hidden">
        <div className="addMember">
          <AddMemberToTeam/>
        </div>
        <div className="teamMembers h-[90%] w-full overflow-hidden">
          <MemberCard/>
        </div>
      </div>
    </section>
  );
}
