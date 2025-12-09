import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_BACK_END_URL;

// Types
export interface Project {
  _id: string;
  name: string;
  description: string;
  image?: string;
  github?: string;
  linkedIn?: string;
  technologies?: string[];
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  date?: string;
  image?: string;
  url?: string;
}

export interface Competition {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  date?: string;
}

// API functions
const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_URL}/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

const fetchCompetitions = async (): Promise<Competition[]> => {
  const response = await fetch(`${API_URL}/competitions`);
  if (!response.ok) {
    throw new Error("Failed to fetch competitions");
  }
  return response.json();
};

// Custom hooks using React Query
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};

export const useCompetitions = () => {
  return useQuery({
    queryKey: ["competitions"],
    queryFn: fetchCompetitions,
  });
};

// Mutation hooks for admin operations
export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: Omit<Project, "_id">) => {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Failed to add project");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch projects after successful mutation
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Chatbot API hook
export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
  });
};
