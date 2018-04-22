// Tests for navigation.js
// by Team 2

"use strict";

require("../www/js/navigation.js");

describe("State Consistency", function() {
    it("is initially map", function() {
        expect([0,1,2]).toContain(currentPage);
    });
    it("remains on map if map reinvoked", function() {
        displayMap();
        expect([0,1,2]).toContain(currentPage);
    });
    it("displays photos", function() {
        displayPhotos();
        expect(currentPage).toEqual(99);
    });
    it("remains on photos", function() {
        displayPhotos();
        expect(currentPage).toEqual(99);
    });
    it("displays news", function() {
        displayNews();
        expect(currentPage).toEqual(3);
    });
    it("remains on news", function() {
        displayNews();
        expect(currentPage).toEqual(3);
    });
    it("displays events", function() {
        displayNews();
        expect(currentPage).toEqual(5);
    });
    it("remains on events", function() {
        displayNews();
        expect(currentPage).toEqual(5);
    });
    it("displays info", function() {
        displayNews();
        expect(currentPage).toEqual(9);
    });
    it("remains on info", function() {
        displayNews();
        expect(currentPage).toEqual(9);
    });
    it("displays volunteer", function() {
        displayNews();
        expect(currentPage).toEqual(10);
    });
    it("remains on volunteer", function() {
        displayNews();
        expect(currentPage).toEqual(10);
    });
});