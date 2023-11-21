import PropertyList from '@/components/property/PropertyList';

const getAllProperties = async () => {
  const res = await fetch(`${process.env.BASE_URL}/property`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return res.json();
};

const Home = async () => {
  const propertyData = await getAllProperties();

  return (
    <section>
      <PropertyList {...propertyData} />
    </section>
  );
};

export default Home;
