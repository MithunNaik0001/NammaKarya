export default async function UserInfo({params}){
    const id=await params.user
    return <div>id is :{id}</div>
}