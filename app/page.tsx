"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { LibrarySection } from "@/components/LibrarySection";
import { BaseModal } from "../components/modals/BaseModal";
import { RequestAccessModal } from "../components/modals/RequestAccessModal";
import { OnboardingModal } from "../components/modals/OnboardingModal";
import { CoachMark } from "../components/CoachMark";
import { useModalManager } from "../hooks/useModalManager";
import { mockData } from "@/utils/mockData";
import { AccessStatus, CoachStep, LibraryItem, LibraryTab } from "@/types";
import {
  UserCircleIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function Home() {
  // State management
  const [activeTab, setActiveTab] = useState<LibraryTab>("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedForRequest, setSelectedForRequest] = useState<Set<string>>(
    new Set()
  );
  const [accessRequested, setAccessRequested] = useState<Set<string>>(
    new Set()
  );

  // Initialize access granted state
  const [accessGranted] = useState<Set<string>>(
    new Set(["kpi-1", "viz-1", "layout-1"])
  );

  // Combine all items
  const allItems = useMemo(() => [
    ...mockData.kpi,
    ...mockData.dataviz,
    ...mockData.layout,
    ...mockData.storyboard,
  ], []);

  // Modal management
  const { isOpen, selectedItem, openModal, closeModal } = useModalManager();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentCoachStep, setCurrentCoachStep] = useState<number | null>(null);

  // Check localStorage after component mounts
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // Define coach steps
  const coachSteps: CoachStep[] = [
    {
      target: "search-bar",
      title: "Search for Assets",
      description:
        "Quickly find what you need by searching through our entire library of assets.",
    },
    {
      target: "navigation-tabs",
      title: "Browse Categories",
      description:
        "Navigate through different types of assets using these category tabs.",
    },
    {
      target: "stats-section",
      title: "Library Overview",
      description:
        "See at a glance how many assets are available in each category.",
    },
    {
      target: "request-access",
      title: "Request Access",
      description:
        "Need access to restricted content? Click here to submit a request.",
    },
  ];

  // Handle onboarding actions
  const startOnboarding = useCallback(() => {
    setShowOnboarding(false);
    setCurrentCoachStep(0);
  }, []);

  const completeOnboarding = useCallback(() => {
    setCurrentCoachStep(null);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentCoachStep((prev) => {
      if (prev === null || prev >= coachSteps.length - 1) {
        return null;
      }
      return prev + 1;
    });
  }, [coachSteps.length]);

  const handlePreviousStep = useCallback(() => {
    setCurrentCoachStep((prev) => {
      if (prev === null || prev <= 0) {
        return null;
      }
      return prev - 1;
    });
  }, []);

  // Callback functions
  const toggleFavorite = useCallback((item: LibraryItem) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item.id)) {
        newFavorites.delete(item.id);
      } else {
        newFavorites.add(item.id);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favorites.has(itemId),
    [favorites]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const checkAccess = useCallback(
    (itemId: string): AccessStatus => {
      if (accessGranted.has(itemId)) return "granted";
      if (accessRequested.has(itemId)) return "pending";
      return "none";
    },
    [accessGranted, accessRequested]
  );

  const getInaccessibleItems = useCallback(() => {
    return allItems.filter((item) => checkAccess(item.id) === "none");
  }, [allItems, checkAccess]);

  const toggleSelectForRequest = useCallback((itemId: string) => {
    setSelectedForRequest((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const handleSubmitAccessRequests = useCallback(() => {
    setAccessRequested((prev) => {
      const newSet = new Set(prev);
      selectedForRequest.forEach((id) => newSet.add(id));
      return newSet;
    });
    setSelectedForRequest(new Set());
    setRequestModalOpen(false);
  }, [selectedForRequest]);

  // Filter items based on search query
  const filterItems = useCallback(
    (items: LibraryItem[]) => {
      if (!searchQuery) return items;
      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    },
    [searchQuery]
  );

  // Get items based on active tab
  const getItemsForTab = useCallback(
    (tab: string): LibraryItem[] => {
      switch (tab.toLowerCase()) {
        case "my favorites":
          return filterItems(allItems.filter((item) => favorites.has(item.id)));
        case "featured":
          return filterItems([
            ...mockData.kpi.slice(0, 2),
            ...mockData.dataviz.slice(0, 2),
            ...mockData.layout.slice(0, 2),
            ...mockData.storyboard.slice(0, 2),
          ]);
        case "kpi":
          return filterItems(mockData.kpi);
        case "data visualization":
          return filterItems(mockData.dataviz);
        case "layout":
          return filterItems(mockData.layout);
        case "storyboard":
          return filterItems(mockData.storyboard);
        default:
          return [];
      }
    },
    [filterItems, favorites, allItems]
  );

  const getSubtitle = useCallback((tab: string): string => {
    switch (tab.toLowerCase()) {
      case "featured":
        return "Curated top picks from this week";
      case "kpi":
        return "Key Performance Indicators and metrics";
      case "data visualization":
        return "Data visualization templates and dashboards";
      case "layout":
        return "Page layouts and presentation templates";
      case "storyboard":
        return "Presentation flows and narratives";
      default:
        return "";
    }
  }, []);

  // Stats cards data
  const statsCards = [
    {
      title: "KPIs",
      count: mockData.kpi.length,
      icon: ChartBarIcon,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-100",
    },
    {
      title: "Visualizations",
      count: mockData.dataviz.length,
      icon: DocumentChartBarIcon,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-100",
    },
    {
      title: "Layouts",
      count: mockData.layout.length,
      icon: Squares2X2Icon,
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-100",
    },
    {
      title: "Storyboards",
      count: mockData.storyboard.length,
      icon: PresentationChartLineIcon,
      color: "bg-pink-50",
      iconColor: "text-pink-600",
      borderColor: "border-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Library
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Browse for assets needed to report and present analysis
              </p>
            </div>
            <button
              data-coach="request-access"
              onClick={() => setRequestModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent 
                       text-base font-medium rounded-lg text-white bg-blue-600 
                       hover:bg-blue-700 transition duration-150 ease-in-out 
                       shadow-sm"
            >
              <UserCircleIcon className="h-5 w-5 mr-2" />
              Request Access
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div
          data-coach="stats-section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border ${stat.borderColor} bg-white shadow-sm`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Navigation */}
        <div className="space-y-6 mb-8">
          <div data-coach="search-bar">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div data-coach="navigation-tabs">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
        {/* <div className="space-y-6 mb-8">
          <SearchBar onSearch={handleSearch} />
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div> */}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <LibrarySection
            title={activeTab}
            subtitle={getSubtitle(activeTab)}
            items={getItemsForTab(activeTab)}
            onItemClick={openModal}
            checkAccess={checkAccess}
          />
        </div>
        {activeTab === "Featured" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 p-6">
            <LibrarySection
              title="Trending"
              subtitle="Most popular by community"
              items={filterItems([
                ...mockData.kpi.slice(0, 1),
                ...mockData.dataviz.slice(0, 1),
                ...mockData.layout.slice(0, 1),
                ...mockData.storyboard.slice(0, 1),
              ])}
              onItemClick={openModal}
              checkAccess={checkAccess}
            />
          </div>
        )}
        {/* Add Onboarding Modal */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onStart={startOnboarding}
        />

        {/* Add Coach Mark */}
        {currentCoachStep !== null && (
          <CoachMark
            {...coachSteps[currentCoachStep]}
            step={currentCoachStep + 1}
            totalSteps={coachSteps.length}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            onClose={completeOnboarding}
          />
        )}
      </main>

      {/* Modals */}
      {selectedItem && (
        <BaseModal
          isOpen={isOpen}
          onClose={closeModal}
          item={selectedItem}
          isFavorite={isFavorite(selectedItem.id)}
          onToggleFavorite={() => toggleFavorite(selectedItem)}
        />
      )}

      <RequestAccessModal
        isOpen={isRequestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        items={getInaccessibleItems()}
        selectedItems={selectedForRequest}
        onToggleSelect={toggleSelectForRequest}
        onSubmit={handleSubmitAccessRequests}
      />
    </div>
  );
}
