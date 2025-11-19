"use client";

import React, { useState, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function HireProffesionPage() {
    const router = useRouter();
    const [minIncome, setMinIncome] = useState<string>("");
    const [maxIncome, setMaxIncome] = useState<string>("");
    const [incomeError, setIncomeError] = useState<string | null>(null);
    const [selectedShift, setSelectedShift] = useState<string>("any");
    const [selectedType, setSelectedType] = useState<string>("field");
    const [useCurrent, setUseCurrent] = useState<boolean>(false);
    const [cityTown, setCityTown] = useState<string>("");
    const [locality, setLocality] = useState<string>("");
    const [searchJob, setSearchJob] = useState<string>("");
    const [numJobs, setNumJobs] = useState<string>("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const locBtnRef = useRef<HTMLButtonElement | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    function resetForm() {
        setMinIncome("");
        setMaxIncome("");
        setIncomeError(null);
        setSelectedShift("any");
        setSelectedType("field");
        setUseCurrent(false);
        setCityTown("");
        setLocality("");
        setSearchJob("");
        setNumJobs("");
        setFeedback(null);
    }

    function syncIncome(min = minIncome, max = maxIncome) {
        setIncomeError(null);
        const minN = Number(min || 0);
        const maxN = Number(max || 0);
        if (min !== "" && max !== "" && minN > maxN) {
            setIncomeError("Minimum income must be less than or equal to maximum income.");
        }
    }

    async function findCurrentLocation() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        const btn = locBtnRef.current;
        if (btn) {
            btn.disabled = true;
            btn.textContent = "Locating...";
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = "Find current";
                }
                const lat = pos.coords.latitude.toFixed(5);
                const lon = pos.coords.longitude.toFixed(5);
                setCityTown(`Coords: ${lat}, ${lon}`);
                setLocality("Current location (allow permission to use address)");
                setUseCurrent(true);
            },
            (err) => {
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = "Find current";
                }
                alert("Could not get location: " + err.message);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }

    async function onSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        setIncomeError(null);
        const minN = Number(minIncome || 0);
        const maxN = Number(maxIncome || 0);
        if (minIncome !== "" && maxIncome !== "" && minN > maxN) {
            setIncomeError("Minimum income must not exceed maximum income.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setFeedback('Please sign in (or enable anonymous auth) to save this form.');
            return;
        }

        const payload = {
            searchJob: searchJob.trim(),
            numJobs,
            minIncome: minIncome === '' ? null : Number(minIncome),
            maxIncome: maxIncome === '' ? null : Number(maxIncome),
            shift: selectedShift,
            jobType: selectedType,
            useCurrentLocation: useCurrent,
            cityTown: cityTown.trim(),
            locality: locality.trim(),
            createdAt: new Date().toISOString(),
            createdBy: user.uid,
        };

        setIsSaving(true);
        setFeedback('Saving...');
        try {
            // add to Firestore collection named "proffessional"
            await addDoc(collection(db, 'proffessional'), payload as any);
            setFeedback('Saved filters — preview in console.');
            // eslint-disable-next-line no-console
            console.log('Job filter payload saved to Firestore:', payload);
            // navigate to candidate requirement page
            router.push('/candidate-requirement');
        } catch (err) {
            console.error('Error saving to Firestore', err);
            setFeedback('Failed to save — see console for details.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#eef3ff_0%,var(--bg)_100%)] p-7">
            <div className="mx-auto max-w-3xl">
                <div className="bg-white rounded-xl shadow-md p-6 border" role="region" aria-labelledby="frmTitle">
                    <div className="flex items-center justify-between">
                        <h1 id="frmTitle" className="text-lg font-semibold">About job</h1>
                        <Link href="/candidate-requirement" className="text-sm text-blue-600 underline">Go to Candidate Requirement</Link>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Enter filters to search jobs. You can use current location to autofill city/locality.</p>

                    <form id="jobForm" onSubmit={onSubmit} noValidate>
                        <div className="mb-4">
                            <label htmlFor="searchJob" className="block text-sm text-gray-600 mb-1">Search job</label>
                            <input id="searchJob" name="searchJob" type="text" placeholder="e.g. Delivery driver, Accountant, Nurse" autoComplete="off" value={searchJob} onChange={(e) => setSearchJob(e.target.value)} className="w-full p-2.5 rounded-lg border" />
                            <div className="text-sm text-gray-500 mt-1">Use keywords to find relevant roles.</div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-[200px]">
                                <label htmlFor="numJobs" className="block text-sm text-gray-600 mb-1">Number of jobs</label>
                                <select id="numJobs" name="numJobs" aria-label="Number of jobs" value={numJobs} onChange={(e) => setNumJobs(e.target.value)} className="w-full p-2.5 rounded-lg border">
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="5">Up to 5</option>
                                    <option value="10">Up to 10</option>
                                    <option value="50">Up to 50</option>
                                </select>
                            </div>

                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm text-gray-600 mb-1">Monthly income (₹)</label>
                                <div className="flex gap-2">
                                    <input id="minIncome" name="minIncome" type="number" placeholder="Min" min={0} step={100} value={minIncome} onChange={(e) => { setMinIncome(e.target.value); syncIncome(e.target.value, maxIncome); }} className="flex-1 p-2.5 rounded-lg border" />
                                    <input id="maxIncome" name="maxIncome" type="number" placeholder="Max" min={0} step={100} value={maxIncome} onChange={(e) => { setMaxIncome(e.target.value); syncIncome(minIncome, e.target.value); }} className="flex-1 p-2.5 rounded-lg border" />
                                </div>
                                {incomeError && <div id="incomeError" className="text-sm text-red-600 mt-1">{incomeError}</div>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-2">Job shift</label>
                            <div role="radiogroup" aria-label="Job shift" className="flex gap-2">
                                {[
                                    { label: 'Any', value: 'any' },
                                    { label: 'Day', value: 'day' },
                                    { label: 'Night', value: 'night' },
                                ].map((opt) => (
                                    <button key={opt.value} type="button" onClick={() => setSelectedShift(opt.value)} className={`px-3 py-2 rounded-full border ${selectedShift === opt.value ? 'bg-blue-500 text-white' : 'bg-white'}`} aria-pressed={selectedShift === opt.value}>{opt.label}</button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-2">Job type</label>
                            <div role="radiogroup" aria-label="Job type" className="flex gap-2">
                                {[
                                    { label: 'Field', value: 'field' },
                                    { label: 'Industry', value: 'industry' },
                                ].map((opt) => (
                                    <button key={opt.value} type="button" onClick={() => setSelectedType(opt.value)} className={`px-3 py-2 rounded-full border ${selectedType === opt.value ? 'bg-blue-500 text-white' : 'bg-white'}`} aria-pressed={selectedType === opt.value}>{opt.label}</button>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-2">Choose whether role is field-based or industry-based.</div>
                        </div>

                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" id="useCurrent" name="useCurrent" checked={useCurrent} onChange={(e) => setUseCurrent(e.target.checked)} className="mr-2" />
                                    <span className="text-sm text-gray-700">Use current location</span>
                                </label>
                            </div>
                            <div>
                                <button type="button" id="locBtn" ref={locBtnRef} className="px-3 py-2 rounded-md border bg-gray-50" onClick={findCurrentLocation} title="Get current location">Find current</button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cityTown" className="block text-sm text-gray-600 mb-1">Search city / town</label>
                            <input id="cityTown" name="cityTown" type="text" placeholder="e.g. Bengaluru, Mumbai" value={cityTown} onChange={(e) => setCityTown(e.target.value)} list="cityList" className="w-full p-2.5 rounded-lg border" />
                            <datalist id="cityList">
                                <option value="Bengaluru" />
                                <option value="Mumbai" />
                                <option value="Delhi" />
                                <option value="Chennai" />
                                <option value="Kolkata" />
                            </datalist>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="locality" className="block text-sm text-gray-600 mb-1">Search locality / area</label>
                            <input id="locality" name="locality" type="text" placeholder="e.g. Jayanagar, Andheri East" value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full p-2.5 rounded-lg border" />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" id="resetBtn" onClick={(e) => { e.preventDefault(); resetForm(); }} className="px-4 py-2 rounded-md border bg-gray-100">Reset</button>
                            <button href="/candidate-requirement" type="submit" id="saveNext" className="px-4 py-2 rounded-md bg-blue-600 text-white">Save &amp; Next</button>
                        </div>

                        <input type="hidden" id="selectedShift" name="selectedShift" value={selectedShift} />
                        <input type="hidden" id="selectedType" name="selectedType" value={selectedType} />
                        {feedback && <div id="submitFeedback" className="text-sm text-gray-600 mt-3">{feedback}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

