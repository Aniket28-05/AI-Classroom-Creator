import {
  HealthStatus,
  LessonInputParams,
  LessonPackage,
  SectionRegeneratePayload,
  SectionResponse,
} from '../types/lesson';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.detail || `Request failed with status ${response.status}`;
        throw new Error(message);
      }
      return await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('An unknown network error occurred');
    }
  }

  async checkHealth(): Promise<HealthStatus> {
    return this.request<HealthStatus>('/api/health');
  }

  async generateLesson(params: LessonInputParams): Promise<LessonPackage> {
    return this.request<LessonPackage>('/api/lessons/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async regenerateSection(payload: SectionRegeneratePayload): Promise<SectionResponse> {
    return this.request<SectionResponse>('/api/lessons/regenerate-section', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async askQuestion(question: string, lessonContext?: LessonInputParams): Promise<{ answer: string }> {
    return this.request<{ answer: string }>('/api/lessons/ask', {
      method: 'POST',
      body: JSON.stringify({
        question,
        lesson_context: lessonContext,
      }),
    });
  }
}

export const api = new ApiService();
