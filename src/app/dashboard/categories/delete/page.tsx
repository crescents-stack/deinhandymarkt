import DeleteForm from "../_utils/components/delete-form";

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
    <div className="max-w-[300px] space-y-8">
      <h3 className="text-[16px] md:text-[20px] font-bold">
        Are you sure to delete?
      </h3>
      <div>
        This item will be deleted from this store! To delete type&nbsp;
        <span className="px-2 pt-1 pb-1 font-semibold text-pink-600 bg-pink-50 rounded">
          DELETE
        </span>
        &nbsp;in this input box
      </div>
      <DeleteForm _id={searchParams._id} />
    </div>
  );
};

export default Page;
