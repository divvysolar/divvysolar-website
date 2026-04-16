import PageHero from '@/components/common/PageHero';
import ProjectGalleryGrid from '@/components/projects/ProjectGalleryGrid';

export const metadata = {
    title: 'Milestone Projects | Divvy Solar',
    description: 'Explore Divvy Solar project milestones. Verified live installations with technical specifications and performance data.',
};

export default function ProjectsPage() {
    return (
        <div className="bg-white min-h-screen">
            <ProjectGalleryGrid />
        </div>
    );
}
