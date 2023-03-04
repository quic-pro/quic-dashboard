import Header from './Header';
import PageContainer from './PageContainer';


export default function Layout() {
    return (
        <div className="flex-1 flex flex-col">
            <Header/>
            <PageContainer/>
        </div>
    );
}
