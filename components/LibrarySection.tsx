import React, { useEffect, useRef, useState } from "react";
import { AccessStatus, LibraryItem } from "@/types";
import { LibraryCard } from "./LibraryCard";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface LibrarySectionProps {
  title: string;
  subtitle: string;
  items: LibraryItem[];
  onItemClick: (item: LibraryItem) => void;
  isLoading?: boolean;
  error?: string;
  checkAccess: (item: string) => AccessStatus;
}

export const LibrarySection = ({
  title,
  subtitle,
  items,
  onItemClick,
  isLoading = false,
  error,
  checkAccess,
}: LibrarySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple intersection observer implementation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Empty state handling
  if (!isLoading && items.length === 0) {
    return (
      <section className="mb-12" aria-label={title}>
        <SectionHeader title={title} subtitle={subtitle} />
        <EmptyState message="No items found. Try adjusting your search criteria." />
      </section>
    );
  }

  // Error state handling
  if (error) {
    return (
      <section className="mb-12" aria-label={title}>
        <SectionHeader title={title} subtitle={subtitle} />
        <ErrorState message={error} />
      </section>
    );
  }

  return (
    <section className="mb-12" aria-label={title} ref={sectionRef}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-2"></div>
        </h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`
              transform transition-all duration-500 ease-out
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <LibraryCard
              item={item}
              onClick={onItemClick}
              accessStatus={checkAccess(item.id)}
            />
          </div>
        ))}
      </div>

      {isLoading && <LoadingState />}
    </section>
  );
};

// Utility Components

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
    <p className="text-gray-600 text-sm">{subtitle}</p>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
      <InformationCircleIcon className="w-8 h-8 text-gray-400" />
    </div>
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
      <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
    </div>
    <p className="text-red-600 font-medium">{message}</p>
  </div>
);

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      >
        <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-50"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
          <div className="h-3 bg-gray-100 rounded-full w-full"></div>
          <div className="h-3 bg-gray-100 rounded-full w-4/5"></div>
        </div>
      </div>
    ))}
  </div>
);

export type LibrarySectionRef = HTMLElement;
export type LibrarySectionElement = React.ElementRef<typeof LibrarySection>;
