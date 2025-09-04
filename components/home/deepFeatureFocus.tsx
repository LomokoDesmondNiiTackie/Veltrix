import { CpuChipIcon, ChartBarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function DeepFeatureFocus() {
    const features = [
        {
            icon: CpuChipIcon,
            title: "AI-Powered Automation",
            description: "Intelligent workflow automation that learns from your patterns and optimizes processes in real-time."
        },
        {
            icon: ChartBarIcon,
            title: "Smart Analytics",
            description: "Advanced reporting with predictive insights and data-driven recommendations for better decision making."
        },
        {
            icon: AdjustmentsHorizontalIcon,
            title: "Dynamic Prioritization",
            description: "Context-aware task prioritization that adapts to deadlines, team capacity, and project requirements."
        }
    ];

    return (
        <section className="deepFeatureFocus min-h-screen w-full flex flex-col gap-10 items-center py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 ">
            <div className="space-y-6 lg:w-[80%]">
                            <h1 className=" w-full text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
                                Plan Smart.<span className="text-brand-teal">Deliver Fast. </span></h1>
                            <p className="text-xl sm:text-2xl text-neutral-gray leading-relaxed max-w-2xl">
                                Transform your workflow with intelligent automation, AI-driven insights, 
                                and smart prioritization that adapts to your team&#39;s needs.
                            </p>
                        </div>
            <div className="container mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
                    <div className="space-y-8 lg:space-y-12">
                        {/* Feature List */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="group">
                                    <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-teal text-white flex items-center justify-center text-2xl">
                                          <feature.icon className="w-8 h-8" />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold mb-2 text-brand-teal">
                                                {feature.title}
                                            </h3>
                                            <p className="text-neutral-gray leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative bg-white rounded-3xl shadow-2xl border border-neutral-gray/10 overflow-hidden">
                            <div className="p-6 h-96 overflow-hidden relative">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-dark">Project Dashboard</h3>
                                        <p className="text-sm text-neutral-gray">Smart automation in action</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-brand-teal rounded-full" />
                                        <span className="text-sm font-medium text-brand-teal">AI Active</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: "User Authentication", priority: "High", progress: 85, color: "bg-brand-teal" },
                                        { title: "Dashboard Analytics", priority: "Medium", progress: 60, color: "bg-brand-azure" },
                                        { title: "API Integration", priority: "Low", progress: 30, color: "bg-brand-purple" }
                                    ].map((task, index) => (
                                        <div key={index} className="bg-white rounded-xl p-4 border border-neutral-gray/10 shadow-soft">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-neutral-dark">{task.title}</h4>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <div className="w-full bg-neutral-light rounded-full h-2 mb-2">
                                                <div
                                                    className={`h-2 rounded-full ${task.color}`}
                                                    style={{ width: `${task.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-neutral-gray">
                                                <span>{task.progress}% Complete</span>
                                                <span className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-brand-teal rounded-full" />
                                                    <span>Auto-updating</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
