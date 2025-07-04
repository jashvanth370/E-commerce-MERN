import React from 'react';

const testimonials = [
    { name: 'Alice', text: 'Great products and fast delivery!' },
    { name: 'Bob', text: 'Amazing customer service and quality.' },
    { name: 'Carol', text: 'My favorite place to shop online.' },
];

const TestimonialsSection = () => (
    <section className="bg-white py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
                <div key={t.name} className="bg-blue-50 rounded-xl p-6 shadow text-center">
                    <div className="text-lg font-semibold mb-2">{t.name}</div>
                    <div className="text-gray-700 italic">"{t.text}"</div>
                </div>
            ))}
        </div>
    </section>
);

export default TestimonialsSection; 