export async function generateStaticParams() {
  return [{ slug: 'post-1' }, { slug: 'post-2' }];
}
const Slug = () => {
  return <p>Slug-abc</p>;
};
export default Slug;
