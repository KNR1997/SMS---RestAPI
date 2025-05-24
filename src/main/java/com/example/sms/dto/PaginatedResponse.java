package com.example.sms.dto;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> data;
    private long total;
    private int perPage;
    private int currentPage;
    private int lastPage;

    public PaginatedResponse(List<T> data, long total, int perPage, int currentPage) {
        this.data = data;
        this.total = total;
        this.perPage = perPage;
        this.currentPage = currentPage;
        this.lastPage = (int) Math.ceil((double) total / perPage);
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getPerPage() {
        return perPage;
    }

    public void setPerPage(int perPage) {
        this.perPage = perPage;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getLastPage() {
        return lastPage;
    }

    public void setLastPage(int lastPage) {
        this.lastPage = lastPage;
    }
}
