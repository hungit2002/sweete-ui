import FormCreatePost from "@/app/components/post/FormCreatePost";
import { UserInfoLS } from "@/models";
function HomeFeeds(props: { userInfo: UserInfoLS }) {
    const { userInfo } = props;

    return (
        <>
            <div className="mt-3 max-w-[597px] mx-auto">
                <FormCreatePost userInfo={userInfo}/>
                {/*<News userInfo={userInfo}/>*/}
                <div className={"mt-3 flex flex-col gap-3"}>

                </div>
            </div>
        </>
    );
}

export default HomeFeeds;
