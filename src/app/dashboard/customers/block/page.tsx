import CustomerAccountBlockForm from "../_utils/components/block-form";



const Page = ({searchParams}: {searchParams: {_id: string}}) => {
    return (
        <CustomerAccountBlockForm _id={searchParams._id}/>
    )
}

export default Page;