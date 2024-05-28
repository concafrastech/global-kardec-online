import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Course} from '../../models/course';
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class CourseSerivce {
    private apiUrl: String;

    constructor(private _http: HttpClient) {
        // Define a URL da API a partir das configurações de ambiente
        this.apiUrl = environment.apiUrl;
    }

    /**
     * Esta função retorna todos os cursos cadastrados na base de dados.
     *
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    getAllCourses(): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        return this._http.get(`${this.apiUrl}/gk/curso?pagina=0&limite=1000`, {headers});
    }

    /**
     * Esta função é responsável por criar um curso na base de dados.
     *
     * @param course - Um objeto do tipo Course contendo os dados do curso a ser criado.
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    createCourse(course: Course): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        // Realiza uma requisição POST para criar um novo curso
        return this._http.post(`${this.apiUrl}/gk/curso`, course, {headers});
    }

    /**
     * Esta função é responsável por excluir um curso da base de dados.
     *
     * @param uuid - O identificador único do curso a ser excluído.
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    deleteCourse(uuid: string): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        // Realiza uma requisição DELETE para excluir um curso específico
        return this._http.delete(`${this.apiUrl}/gk/curso/${uuid}`, {headers});
    }

    /**
     * Esta função é responsável por atualizar um curso na base de dados.
     *
     * @param course - Um objeto do tipo Course contendo os novos dados do curso a ser atualizado.
     * @return Observable<any> - Um objeto Observable contendo a resposta da requisição HTTP.
     */
    updateCourse(course: Course): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        };

        // Realiza uma requisição PUT para atualizar um curso existente
        return this._http.put(`${this.apiUrl}/gk/curso`, course, {headers});
    }

    /**
     * Obtém um curso específico pelo ID.
     * @param idCourse O ID do curso a ser recuperado.
     */
    public getCourse(idCourse: string | null): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        }
        return this._http.get<any>(`${this.apiUrl}/gk/curso/${idCourse}`, {headers})
            .pipe(
                // Lidar com respostas da API em potencial com ou sem uma propriedade "data"
                map(response => response.data || response),
                catchError(this.handleError)
            );
    }


    /**
     * Lida com erros retornados pelas requisições HTTP.
     *
     * @param error O objeto de erro retornado pela requisição HTTP.
     * @returns Um Observable com uma mensagem de erro.
     */
    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Ocorreu um erro do lado do cliente ou da rede. Trate-o de acordo.
            errorMessage = 'Ocorreu um erro: ' + error.error.message;
        } else {
            // O backend retornou um código de resposta não bem-sucedido.
            // O corpo da resposta pode conter pistas sobre o que deu errado.
            errorMessage = `O backend retornou o código ${error.status}: ${error.message}`;
        }
        console.error(errorMessage); // Registre o erro no console
        return throwError(errorMessage); // Relance o erro como um observable para manipulação adequada de erros
    }

    archivingCourse(course: Course){
        let headers = {
            'Content-Type': 'application/json',
        };
        course.tipoCurso = 3
        // Realiza uma requisição DELETE para excluir um curso específico
        return this._http.put(`${this.apiUrl}/gk/curso`, course, {headers});
    }

}
