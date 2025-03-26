import FormCreatePost from "@/app/components/post/FormCreatePost";
import { UserInfoLS } from "@/models";
import ListPost from "@/app/Modules/Home/Feeds/ListPost/ListPost";
function HomeFeeds(props: { userInfo: UserInfoLS }) {
    const { userInfo } = props;

    return (
        <>
            <div className="mt-3 max-w-[597px] mx-auto">
                <FormCreatePost userInfo={userInfo}/>
                {/*<News userInfo={userInfo}/>*/}
                <div className={"mt-3 flex flex-col gap-3"}>
                    <ListPost/>
                </div>
            </div>
        </>
    );
}

export default HomeFeeds;
