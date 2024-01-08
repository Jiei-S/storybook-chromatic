import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import { Project } from "../../src/store/projects/slice";

const API_BASE_URL = "http://localhost:6006";

const mockProjects: Project[] = [...Array(3)].map((_, i) => ({
  id: uuid(),
  name: `Name ${i + 1}`,
}));

export default [
  http.get(`${API_BASE_URL}/projects`, () => {
    return HttpResponse.json(mockProjects);
  }),
  http.get(`${API_BASE_URL}/projects/:id`, ({ params }) => {
    const { id } = params;
    const project = mockProjects.find((p) => p.id === id);
    return HttpResponse.json(project);
  }),
  http.post(`${API_BASE_URL}/projects`, async ({ request }) => {
    const newProject = await request.json();
    return HttpResponse.json(newProject);
  }),
  http.put(`${API_BASE_URL}/projects/:id`, async ({ request }) => {
    const newProject = await request.json();
    return HttpResponse.json(newProject);
  }),
];
