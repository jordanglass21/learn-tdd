import mongoose from "mongoose";
import Author from "../models/author";
import app from "../server";
import request from "supertest";

describe('Verify author service', () => {

    const mockAuthors = [
        { first_name: 'John', family_name: 'Doe', date_of_birth: new Date('1958-10-10'), date_of_death: new Date('2020-01-01') },
        { first_name: 'Jane', family_name: 'Stone', date_of_birth: new Date('1964-05-21'), date_of_death: new Date('2020-01-01') },
        { first_name: 'Jack', family_name: 'Spade', date_of_birth: new Date('1989-01-09') },
        { first_name: 'Jill', family_name: 'Smith', date_of_birth: new Date('1992-12-27') }
    ];

    let consoleSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    })

    afterAll(() => {
        consoleSpy.mockRestore();   
    })

    test('should respond with a sorted list of author names and lifetimes', async () => {
        const expected = [...mockAuthors]
        .sort((a, b) => a.family_name.localeCompare(b.family_name))
        .map(author => ({
            name: `${author.first_name} ${author.family_name}`,
            lifetime: `${author.date_of_birth.getFullYear()}-${author.date_of_death?.getFullYear() || '-'}`
        }));

        Author.getAllAuthors = jest.fn().mockImplementation((sortOpts: any) => {
            if(sortOpts && sortOpts.family_name === 1) {
                return Promise.resolve(expected);
            }
            return Promise.resolve(mockAuthors);
        });
        const response = await request(app).get('/authors');
    
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expected);
    });

    test('should respond with "no authors found" when there are no authors in the database', async () => {
        Author.getAllAuthors = jest.fn().mockResolvedValue([]);
        const response = await request(app).get('/authors');
        
        expect(response.status).toBe(200);
        expect(response.text).toBe('No authors found');
        expect(response.body).toEqual({});
    });

    test('should respond with 500 if an error occurs when retrieving authors', async () => {
        Author.getAllAuthors = jest.fn().mockRejectedValue(new Error('Database error'));
    
        const response = await request(app).get('/authors');
    
        expect(response.status).toBe(500);
        expect(consoleSpy).toHaveBeenCalled();
    });


});